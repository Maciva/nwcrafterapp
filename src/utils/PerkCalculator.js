import utils from "./utils"
import perkBuckets from '../res/perkBuckets.json'
import perkMap from '../res/perkMapFiltered.json'
import weights from '../res/perkWeights.json'

export default class PerkCalculator {


    constructor(itemClass) {
        this.itemClass = itemClass;
        this.availablePerks = perkBuckets[this.itemClass].inPool.concat(perkBuckets[this.itemClass].onlyWithCharm).map(perkId => perkMap[perkId]);
        this.labels = this.buildLabelQuantityMap();
    }

    calculateMostEfficientCharm = (selectedPerks) => {
        const result = [];
        selectedPerks.forEach((perkBucket, i) => {
            perkBucket.forEach((perk, j) => {
                const perksCopy = JSON.parse(JSON.stringify(selectedPerks));
                const perkCopy = perksCopy[i][j]
                perkCopy.charm = true;
                perksCopy[i] = [perkCopy];
                const prob = this.calculate(perksCopy);
                result.push({probability: prob, perk: perk})
            } )
        })
        return result;
    }

    calculate = (selectedPerks) => {
        const selectedLabels = this.getSelectedLabels(selectedPerks);
        let total = 0;
        const emptyBuckets = selectedLabels.filter(container => container.empty).length
        const labelValues = selectedLabels.map(container => Object.values(container.labels));
        const allPermutations = utils.permutator(labelValues);
        const withCharm = labelValues.flat().some(label => label.charm)
        allPermutations.forEach(permutation => {
            // only allow permutations, where the charm is in first perk slot
            if (withCharm && permutation[0].some(label => !label.charm)) {
                return;
            }
            const allCombinations = utils.cartesian(permutation);
            allCombinations.forEach(combination => {
                total += this.calculateSinglePerkSelection(combination);
            })
        })
        if (emptyBuckets > 1 ) {
            return total / emptyBuckets;
        }
        return total;
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