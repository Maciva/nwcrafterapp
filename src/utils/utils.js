const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

function cartesian(a) {
    return a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
}

function canPutPerk(perk, index, selectedPerks) {
    const others = !selectedPerks.filter((el, i) => i !== index).some(perkList => {
        return perkList.filter(innerPerk => innerPerk.perk.perkId !== perk.perkId).some(innerPerk => innerPerk.perk.label.some(label => perk.label.includes(label)))
    });
    if (!others) {
        return false;
    }
    const charm = !selectedPerks[index].some(innerPerk => innerPerk.charm);
    return charm;
}

var f = [];

function factorial(n) {
    if (n === 0 || n === 1)
        return 1;
    if (f[n] > 0)
        return f[n];
    return f[n] = factorial(n - 1) * n;
}

function k_combinations(set, k) {
    var i, j, combs, head, tailcombs;
    if (k > set.length || k <= 0) {
        return [];
    }
    if (k == set.length) {
        return [set];
    }
    if (k == 1) {
        combs = [];
        for (i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }
    combs = [];
    for (i = 0; i < set.length - k + 1; i++) {
        head = set.slice(i, i + 1);
        tailcombs = k_combinations(set.slice(i + 1), k - 1);
        for (j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}

const utils = { permutator: permutator, cartesian: cartesian, canPutPerk: canPutPerk, factorial: factorial, k_combinations: k_combinations };

export default utils;