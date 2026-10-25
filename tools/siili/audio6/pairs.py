# Finnish line index -> Swedish line index, per chapter (indices into the concatenated blocks)
def rng(a, b, s):  # F a..b -> S s..
    return {a + k: s + k for k in range(b - a + 1)}

CH = {
 '6': dict(F=['Block 6A', 'Block 6B'], S=['Svenska 6, del 1', 'Svenska 6, del 2'],
   P={**rng(0, 6, 0), 7: 6, 8: 7, 9: 8, 10: 8, 11: 9, **rng(29, 49, 10), 51: 31, **rng(52, 58, 32),
      70: 39, 71: 40, **rng(73, 83, 41), **rng(85, 88, 58)},
   SO=list(range(52, 58))),
 '7': dict(F=['Block 7A', 'Block 7B'], S=['Svenska 7'],
   P={**rng(0, 9, 0), 15: 10, **rng(21, 26, 11), **rng(34, 37, 17), **rng(39, 44, 21), 46: 27, 47: 28,
      54: 29, 55: 30, **rng(58, 68, 31), **rng(69, 72, 47)},
   SO=list(range(42, 47))),
 '8': dict(F=['Block 8A', 'Block 8B'], S=['Svenska 8'],
   P={0: 0, 1: 1, **rng(14, 17, 2), 19: 6, **rng(26, 34, 7), 36: 16, 38: 17, 45: 18, **rng(52, 54, 23)},
   SO=list(range(19, 23))),
 '9': dict(F=['Block 9A', 'Block 9B'], S=['Svenska 9'],
   P={**rng(0, 3, 0), **rng(19, 21, 4), **rng(35, 37, 7), 39: 10, **rng(48, 51, 11), 56: 15,
      **rng(62, 65, 16), **rng(66, 69, 24)},
   SO=list(range(20, 24))),
 '10': dict(F=['Block 10A', 'Block 10B'], S=['Svenska 10'],
   P={**rng(0, 3, 0), 9: 4, 15: 5, 18: 6, 20: 7, 23: 8, 25: 9, 26: 10, 29: 11, 35: 12, 36: 18},
   SO=list(range(13, 18))),
 'R': dict(F=['Block R'], S=['Svenska R'], P=rng(0, 10, 0), SO=[]),
}
