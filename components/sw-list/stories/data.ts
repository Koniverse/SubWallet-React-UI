export type DemoAccountType = {
  name: string;
  address: string;
};

export const demoAddresses: string[] = [
  '16Zua5n9c2YgwxraeopVQVW85QEELjgw91GoWVyviTFaypVd',
  '16ZeddJCh3sGjvAKTM1EUF6qmEQdZbwTZHDHbtpCpjEmQSf3',
  '13kmdnZ8QFLr3CjhbvQ4hhQGoEBrKbWrHSqQ75FwfqLfGAJD',
  '14TeaECoXHuiexzoFSXrN3ZRoMM7vakS1Y7teTMtkpqnR98K',
  '14SJR4wtwYMtBo2UA7wcwiiCwTCwQqcDHwpAYAwym62xgZpk',
  '15nGwRtEk4jz1utFoxfFonv9fdJjmpCBDYSE37jRd6Vyqx9G',
  '12zbitFPhBNNVZu6y2utmdHKMk5hsiEkhsxxb5o75i3aKph1',
  '13s1eAyxcV5qtqKziXoM1YErBTKJTK9An34YMuMrTGMwhi8n',
  '12ePTaYYt9Hy9rfJeg6ojWMeGwmZTDcL6yeTdRUmz9KMekh1',
  '133zt6sohJtZThgRHNbYbUYaS8h6Pi91iF7qqsU16KNqQziP',
  '14Kazg6SFiUCH7FNhvBhvr4WNfAXVtKKKhtBQ1pvXzF1dQhv',
  '1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7',
  '12Uq2Gy3XyegdgkqB54Nv4GgwhEg1a52wL3PwpHaSvMW8635',
  '13s1eAyxcV5qtqKziXoM1YErBTKJTK9An34YMuMrTGMwhi8n',
  '15KbHe3guRGMgpB91ymVLTspJskKAJQpUZQmzzQkHd3YhU4m',
  '15QFBQY6TF6Abr6vA1r6opRh6RbRSMWgBC1PcCMDDzRSEXf5',
  '13TsyBSNxFdBN7r9W1spyeQf3a4MEC3pRiuCVjr5oZCXsEQ1',
  '158m6JonPnjaHfMzUjY8XjDSo1sxSknBeKFJBw5SfWLoTvxe',
  '121oh5qXHBLDUgKM4tcwhsniYucr7ByYRtUh7P9JkhA5nmNG',
  '12P4Y3hV6r2D7A7saeC9JVfjVpxA757AeDJrGT7u9T6t6KwR',
  '158m6JonPnjaHfMzUjY8XjDSo1sxSknBeKFJBw5SfWLoTvxe',
  '1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7',
  '165C3NP3DczvMQezF9p5KfS8PM9DrbcKMtixrTg2rsBdGtof',
  '1jp9LfxfeKagkSPbvLTTkW81QxbBfvMnaQL4g1i1qGpMkHo',
  '1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7',
  '12nr7GiDrYHzAYT9L8HdeXnMfWcBuYfAXpgfzf3upujeCciz',
  '16hp43x8DUZtU8L3cJy9Z8JMwTzuu8ZZRWqDZnpMhp464oEd',
  '15vkEkqya2YGDhiXYHqVwBmMp87yEq844Abv1VUZzbHLWgff',
  '1sPKsFqmjwxEHJt1d3oPZj9yhJ2WKSW2aXsNsRD1Eif5FdP',
  '16EAJ4YBYvfACqJzJPiTjuRPqYcsP91o3312GNTfpJdsWBFh',
  '15u2N1pqWr56teREjQTP5M3tk1SPQjEoUAV6jFfcQCoVy3S5',
  '123yqvqBQduJz1QQkJxALKxeWT3ei7K6V98UukoqEAodQUCB',
  '14C5S2kynin3sA7tVPdkYrnntANs1q1uFrJQQcixBVbJ64WN',
  '12nQuw4PzXNnTNhHy5TCxf6cUBUCL3y4n8rWaZ7DTbo19kpZ',
  '12UJSqmSBgdFjmVTVc7MQnwGjykvAUBGdFeHQNuWJaESa3LW',
  '16EAJ4YBYvfACqJzJPiTjuRPqYcsP91o3312GNTfpJdsWBFh',
  '14qiRpT7JYtDcYSym74CMKSb11hQnH1CMXi2v8nxQf5gjDfG',
  '15Lnuf2R43pAsfe884npUBb6eC32pa3bZaYeNwiY9wVcY76q',
  '12T1tgaYZzEkFpnPvyqttmPRJxbGbR4uDx49cvZR5SRF8QDu',
  '1TbhZeAzBRd8Zh8vmjxzSYYmN6apEjUXWpSvz4iHUixcj1n',
  '14EVHCgdA59FLXPYC74PPZGBvEttckbqqcbKDtjBNVNLmPZL',
  '13Vyv2BgmwTneYiwwzkRSATeaGNJ6kKQrr7W8vbbdBzwHHp9',
  '136s2iRZip2q7RjwyXcn5woSirWF9HndyjrTs1y73T8Sf2X7',
  '12R6EUBnnmuSo1xkaAnxrxTLW7YdAVbsPCYeP3JMd4GjVXrw',
  '12JjyLqV1Jr6cghQvwMJzur1mnshQiaLiFwhub4k8NLjjUhs',
  '13R1z79yu3LeNjT8ojh67x9GvNrwatT5FF9T7QJxN8fZhRSY',
  '13kmdnZ8QFLr3CjhbvQ4hhQGoEBrKbWrHSqQ75FwfqLfGAJD',
];

function getDemoAccounts(): DemoAccountType[] {
  return demoAddresses.map((address, index) => ({
    address,
    name: `Address ${index + 1}`,
  }));
}

export const DemoAccounts = getDemoAccounts();
