
const main = (config) => {
  const providers = config["proxy-providers"];

  if (!providers || typeof providers !== "object") {
    return config;
  }

  const regions = [
    { flag: "🇭🇰", pattern: "(?i)^(.*)(香港|港岛|Hong\\s*Kong|\\bHK\\b|\\bHKG\\b)(.*)$" },
    { flag: "🇲🇴", pattern: "(?i)^(.*)(澳门|澳門|Macau|Macao|\\bMFM\\b)(.*)$" },
    { flag: "🇹🇼", pattern: "(?i)^(.*)(台湾|臺灣|台北|臺北|Taiwan|\\bTPE\\b|\\bTW\\b)(.*)$" },
    { flag: "🇸🇬", pattern: "(?i)^(.*)(新加坡|狮城|獅城|Singapore|\\bSGP\\b|\\bSG\\b)(.*)$" },
    { flag: "🇯🇵", pattern: "(?i)^(.*)(日本|东京|東京|大阪|Japan|\\bJPN\\b|\\bJP\\b)(.*)$" },
    { flag: "🇰🇷", pattern: "(?i)^(.*)(韩国|韓國|首尔|首爾|Korea|\\bKOR\\b|\\bKR\\b)(.*)$" },
    { flag: "🇺🇸", pattern: "(?i)^(.*)(美国|美國|纽约|紐約|洛杉矶|洛杉磯|United States|\\bUSA\\b|\\bUS\\b)(.*)$" },
    { flag: "🇬🇧", pattern: "(?i)^(.*)(英国|英國|伦敦|倫敦|United Kingdom|\\bGBR\\b|\\bUK\\b|\\bGB\\b)(.*)$" },
    { flag: "🇨🇦", pattern: "(?i)^(.*)(加拿大|Canada|\\bCAN\\b|\\bCA\\b)(.*)$" },
    { flag: "🇦🇺", pattern: "(?i)^(.*)(澳大利亚|澳洲|Australia|\\bAUS\\b|\\bAU\\b)(.*)$" },
    { flag: "🇩🇪", pattern: "(?i)^(.*)(德国|德國|法兰克福|法蘭克福|Germany|\\bDEU\\b|\\bDE\\b)(.*)$" },
    { flag: "🇫🇷", pattern: "(?i)^(.*)(法国|法國|巴黎|France|\\bFRA\\b|\\bFR\\b)(.*)$" },
    { flag: "🇳🇱", pattern: "(?i)^(.*)(荷兰|荷蘭|阿姆斯特丹|Netherlands|\\bNLD\\b|\\bNL\\b)(.*)$" },
    { flag: "🇹🇷", pattern: "(?i)^(.*)(土耳其|Turkey|\\bTUR\\b|\\bTR\\b)(.*)$" },
    { flag: "🇷🇺", pattern: "(?i)^(.*)(俄罗斯|俄羅斯|莫斯科|Russia|\\bRUS\\b|\\bRU\\b)(.*)$" },
    { flag: "🇮🇳", pattern: "(?i)^(.*)(印度|India|\\bIND\\b|\\bIN\\b)(.*)$" },
    { flag: "🇹🇭", pattern: "(?i)^(.*)(泰国|泰國|Thailand|\\bTHA\\b|\\bTH\\b)(.*)$" },
    { flag: "🇻🇳", pattern: "(?i)^(.*)(越南|Vietnam|\\bVNM\\b|\\bVN\\b)(.*)$" },
    { flag: "🇵🇭", pattern: "(?i)^(.*)(菲律宾|菲律賓|Philippines|\\bPHL\\b|\\bPH\\b)(.*)$" },
    { flag: "🇮🇩", pattern: "(?i)^(.*)(印度尼西亚|印尼|Indonesia|\\bIDN\\b|\\bID\\b)(.*)$" },
    { flag: "🇲🇾", pattern: "(?i)^(.*)(马来西亚|馬來西亞|Malaysia|\\bMYS\\b|\\bMY\\b)(.*)$" },
    { flag: "🇮🇹", pattern: "(?i)^(.*)(意大利|義大利|Italy|\\bITA\\b|\\bIT\\b)(.*)$" },
    { flag: "🇪🇸", pattern: "(?i)^(.*)(西班牙|Spain|\\bESP\\b|\\bES\\b)(.*)$" },
    { flag: "🇨🇭", pattern: "(?i)^(.*)(瑞士|Switzerland|\\bCHE\\b|\\bCH\\b)(.*)$" },
    { flag: "🇸🇪", pattern: "(?i)^(.*)(瑞典|Sweden|\\bSWE\\b|\\bSE\\b)(.*)$" },
    { flag: "🇳🇴", pattern: "(?i)^(.*)(挪威|Norway|\\bNOR\\b|\\bNO\\b)(.*)$" },
    { flag: "🇫🇮", pattern: "(?i)^(.*)(芬兰|芬蘭|Finland|\\bFIN\\b|\\bFI\\b)(.*)$" },
    { flag: "🇧🇷", pattern: "(?i)^(.*)(巴西|Brazil|\\bBRA\\b|\\bBR\\b)(.*)$" },
    { flag: "🇦🇪", pattern: "(?i)^(.*)(阿联酋|阿聯酋|迪拜|杜拜|UAE|\\bARE\\b)(.*)$" },
    { flag: "🇿🇦", pattern: "(?i)^(.*)(南非|South Africa|\\bZAF\\b|\\bZA\\b)(.*)$" },
    { flag: "🇮🇪", pattern: "(?i)^(.*)(爱尔兰|愛爾蘭|Ireland|\\bIRL\\b|\\bIE\\b)(.*)$" },
    { flag: "🇸🇨", pattern: "(?i)^(.*)(塞舌尔|塞席爾|Seychelles|\\bSYC\\b|\\bSC\\b)(.*)$" },
    { flag: "🌏", pattern: "(?i)^(.*)(亚太|亞太|Asia[ -]?Pacific|APAC)(.*)$" },
    { flag: "🇺🇦", pattern: "(?i)^(.*)(乌克兰|烏克蘭|Ukraine|\\bUKR\\b|\\bUA\\b)(.*)$" }
  ];

  for (const provider of Object.values(providers)) {
    if (!provider || typeof provider !== "object") continue;

    if (!provider.override || typeof provider.override !== "object") {
      provider.override = {};
    }

    const override = provider.override;
    const existing = Array.isArray(override["proxy-name"])
      ? override["proxy-name"]
      : [];

    override["proxy-name"] = [
      ...existing,
      ...regions.map(region => ({
        pattern: region.pattern,
        target: region.flag + " $1$2$3"
      }))
    ];
  }

  return config;
};
