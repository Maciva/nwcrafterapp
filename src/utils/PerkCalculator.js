import utils from "./utils"
import perkBuckets from '../res/perkBuckets.json'
import perkMap from '../res/perkMapFiltered.json'
import weights from '../res/perkWeights.json'
import modes from "../pages/calculator/modes";

export default class PerkCalculator {


    constructor(itemClass) {
        this.itemClass = itemClass;
        this.availablePerks = perkBuckets[this.itemClass].inPool.concat(perkBuckets[this.itemClass].onlyWithCharm).map(perkId => perkMap[perkId]);
        this.labels = this.buildLabelQuantityMap();
    }

    calculateMostEfficientCharm = (selectedPerks, mode, options) => {
        const modeConfig = modes[mode];
        let indexesWithCharm = [];
        selectedPerks.forEach((perkBucket, i) => {
            if (perkBucket.some(perk => perk.charm)) {
                indexesWithCharm.push(i);
            }
        })
        let indexesWithoutCharm = [...Array(selectedPerks.length).keys()].filter(index => !indexesWithCharm.includes(index));
        const emptyCharmSlots = modeConfig.charmPerks - indexesWithCharm.length;
        const combinations = utils.k_combinations(indexesWithoutCharm, emptyCharmSlots);
        const resComb = combinations.map(indexArray => indexArray.map(index => {
            const res = [];
            [...Array(selectedPerks[index].length).keys()].forEach(j => res.push({ indexes: [index, j] }));
            return res;
        }));

        const result = [];
        resComb.forEach(perkSlotCombination => {
            utils.cartesian(perkSlotCombination).forEach(perkCombination => {
                if (!Array.isArray(perkCombination)) {
                    perkCombination = [perkCombination]
                }
                const indexes = perkCombination.map(indexPair => indexPair.indexes)
                const perks = indexes.map(indexPair => selectedPerks[indexPair[0]][indexPair[1]])
                const perksCopy = JSON.parse(JSON.stringify(selectedPerks));
                indexes.forEach(indexPair => {
                    const perkCopy = perksCopy[indexPair[0]][indexPair[1]]
                    perkCopy.charm = true;
                    perksCopy[indexPair[0]] = [perkCopy];

                })
                const prob = this.calculateTotal(perksCopy, mode, options);
                result.push({ probability: prob, perks: perks })
            })
        })
        return result;
    }

    isCharmOrderValid = (labels) => {
        const containsCharm = labels.map(labelContainer => labelContainer.some(label => label.charm));
        return containsCharm.every((bool, index) => {
            if (index !== 0 && bool) {
                if (!containsCharm[index - 1]) {
                    return false;
                }
            }
            return true;
        })
    }

    calculateTotal = (selectedPerks, mode, options) => {
        const legendaryChance = this.calculate(selectedPerks);
        const epicChance = selectedPerks.every(bucket => bucket.length !== 0) ? 0 : this.calculate(selectedPerks.slice(0, 2));

        const legendaryHitCounts = options.maxGs === 600 ?  1 : 0;
        const epicHitCounts = options.maxGs - options.minGs + 1 - legendaryHitCounts;
        const totalHitCounts = legendaryHitCounts + epicHitCounts;
        const chanceToHitLegendary = legendaryHitCounts / totalHitCounts;
        const chanceToHitEpic = epicHitCounts / totalHitCounts;
        const legendaryTotal = legendaryChance * chanceToHitLegendary;
        const epicTotal = epicChance * chanceToHitEpic;
        const total = epicTotal + legendaryTotal;

        return {
            legendaryChance: legendaryChance,
            chanceToHitLegendary: chanceToHitLegendary,
            legendaryTotal: legendaryTotal,
            epicChance: epicChance,
            chanceToHitEpic: chanceToHitEpic,
            epicTotal: epicTotal,
            total: total
        }
    }

    calculate = (selectedPerks) => {
        const selectedLabels = this.getSelectedLabels(selectedPerks);
        let total = 0;
        const emptyBuckets = selectedLabels.filter(container => container.empty).length
        const labelValues = selectedLabels.map(container => Object.values(container.labels));
        const numberOfCharmBuckets = labelValues.filter(labelContainer => labelContainer.some(label => label.charm)).length
        const allPermutations = utils.permutator(labelValues);
        allPermutations.forEach(permutation => {
            if (!this.isCharmOrderValid(permutation)) {
                return;
            }
            const allCombinations = utils.cartesian(permutation);
            const charmCombinations = permutation.filter(labelBucket => labelBucket.every(label => label.charm)).map(labelBucket => labelBucket.length).reduce((a, b) => a * b, 1);
            let permutationTotal = 0;
            allCombinations.forEach(combination => {
                permutationTotal += this.calculateSinglePerkSelection(combination);
            })
            total += permutationTotal / charmCombinations
        })
        return total / utils.factorial(emptyBuckets) / utils.factorial(numberOfCharmBuckets);
    }


    cartesian(a) {
        return a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
    }

    calculateSinglePerkSelection = (selectedLabels) => {
        const excludedLabels = new Set();
        let result = 1;
        selectedLabels.forEach(label => {
            if (label.excludedLabels.some(excludedLabel => excludedLabels.has(excludedLabel))) {
                result = 0;
            }
            const totalWeight = this.getTotalWeight(Object.keys(this.labels).filter(label => !excludedLabels.has(label)).map(labelName => this.labels[labelName]))
            label.excludedLabels.forEach(excludedLabel => excludedLabels.add(excludedLabel))
            if (label.charm) {
                return;
            }
            result = result * (label.weight / totalWeight) * label.factor;
        });
        return result;
    }

    getTotalWeight = (labels) => {
        return labels.reduce((a, b) => a + b.weight, 0);
    }

    getSelectedLabels = (selectedPerks) => {
        const selectedLabels = Array(selectedPerks.length).fill(undefined).map(ignore => {
            return { empty: false, labels: {} }
        });
        selectedPerks.forEach((pool, index) => {
            if (!pool.length) {
                selectedLabels[index].empty = true;
            }
            pool.forEach((perk) => {
                perk.perk.label.forEach(label => {
                    const obj = selectedLabels[index];
                    if (!obj.labels[label]) {
                        obj.labels[label] = { perkWeight: 0, charm: perk.charm };
                    }
                    obj.labels[label].perkWeight += perk.perk.weight;
                })
            })
        })
        if (selectedLabels.some(labelContainer => labelContainer.empty)) {
            const allLabels = [...new Set(...selectedLabels.map(container => Object.keys(container.labels)))];
            const otherLabelCounts = {};
            this.availablePerks.filter(perk => !perk.label.some(label => allLabels.includes(label))).forEach(perk => {
                perk.label.forEach(label => {
                    if (!otherLabelCounts[label]) {
                        otherLabelCounts[label] = { perkWeight: 0, charm: false };
                    }
                    otherLabelCounts[label].perkWeight += perk.weight;
                })
            })
            selectedLabels.forEach(labelContainer => {
                if (labelContainer.empty) {
                    labelContainer.labels = JSON.parse(JSON.stringify(otherLabelCounts));
                }
            })
        }
        selectedLabels.forEach(labelContainer => {
            Object.keys(labelContainer.labels).forEach(label => {
                let factor = labelContainer.labels[label].perkWeight / this.labels[label].perkWeight;
                if (isNaN((factor))) {
                    factor = 1;
                }
                labelContainer.labels[label] = {
                    label: label,
                    factor: factor,
                    weight: this.labels[label].weight,
                    excludedLabels: this.labels[label].excludedLabels,
                    charm: labelContainer.labels[label].charm
                }
            })
        })
        return selectedLabels;
    }

    buildLabelQuantityMap = () => {
        const labels = {}
        this.availablePerks.forEach(perk => {
            perk.label.forEach(label => {
                if (!labels[label]) {
                    labels[label] = { perkWeight: 0, weight: weights[label], excludedLabels: new Set() };
                }
                labels[label].perkWeight += perk.weight;
                perk.label.forEach(labelToadd => {
                    labels[label].excludedLabels.add(labelToadd);
                })
            })
        })
        Object.values(labels).forEach(label => {
            label.excludedLabels.forEach(labelToInspect => {
                labels[labelToInspect].excludedLabels.forEach(labelToAdd => label.excludedLabels.add(labelToAdd));
            })
            label.excludedLabels = [...label.excludedLabels]
        })
        return labels;
    }

}