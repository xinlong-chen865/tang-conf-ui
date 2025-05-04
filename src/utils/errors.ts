export const errors = {
    "429000": "您已超出费率限制，请稍后再试",
    "400008": "此密码在之前的数据泄露中已被泄露。我们建议您选择其他密码 (#400008).",
};

const warnings = ["400008"];

export const isWarning = (message: string) => {
    let has = false;
    warnings.forEach((code) => {
        has = has || message.includes(code);
    });
    return has;
};
  