import utils from "./utils"
import perkBuckets from '../res/perkBuckets.json'
import perkMap from '../res/perkMapFiltered.json'
import weights from '../res/perkWeights.json'

export default class PerkCalculator {


    constructor(itemClass) {
        this.itemClass = itemClass;
        this.availablePerks = perkBuckets[this.itemClass].inPool.map(perkId => perkMap[perkId]);
        this.labels = this.buildLabelQuantityMap();
    }

    calculate = (selectedPerks) => {
        const selectedLabels = this.getSelectedLabels(selectedPerks);
        console.log(selectedLabels);
    }

    getSelectedLabels = (selectedPerks) => {
        const selectedLabels = Array(selectedPerks.length).fill(undefined).map(ignore => {
            return { empty: false, labels: {} }
        });
        selectedPerks.forEach((pool, index) => {
            if (!pool.length) {
                selectedLabels[index].empty = true;
            }
            pool.forEach(perk => {
                perk.perk.label.forEach(label => {
                    const obj = selectedLabels[0];
                    if (!obj.labels[label]) {
                        obj.labels[label] = 0;
                    }
                    obj.labels[label]++;
                })
            })
        })
        if (selectedLabels.some(labelContainer => labelContainer.empty)) {
            const allLabels = [...new Set(...selectedLabels.map(container => Object.keys(container.labels)))];
            const otherLabelCounts = {};
            this.availablePerks.filter(perk => !perk.label.some(label => allLabels.includes(label))).forEach(perk => {
                perk.label.forEach(label => {
                    if (!otherLabelCounts[label]) {
                        otherLabelCounts[label] = 0;
                    }
                    otherLabelCounts[label]++;
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
                labelContainer.labels[label] = {
                    label: label,
                    factor: labelContainer.labels[label] / this.labels[label].count,
                    weight: this.labels[label].weight
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
                    labels[label] = { count: 0, weight: weights[label] };
                }
                labels[label].count++;
            })
        })
        return labels;
    }


}