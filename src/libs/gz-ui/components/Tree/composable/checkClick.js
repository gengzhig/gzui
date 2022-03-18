// 复选框点击 
export const checkClick = (type, item, sendCheckDataWay, treeData, cbAllData, cbSingleData) => {
    switch (type) {
        case "upward":
            upwardLinkage(item, treeData);
            break;
        case "downward":
            if (item.children) {
                downwardLinkage(item.children, item.checked);
            }
            break;
        case "both":
            upwardLinkage(item, treeData);
            if (item.children) {
                downwardLinkage(item.children, item.checked);
            }
            break;
        default:
            break;
    }
    let oldData = null, newData = null;
    let allData = getCheckAllData(treeData).map(t => ({
        id: t.id,
        label: t.label,
    }));
    if (sendCheckDataWay == "all") {
        cbAllData(allData);
    } else if (sendCheckDataWay == "change") {
        newData = allData
        console.log(oldData, newData);
    } else if (sendCheckDataWay == "single") {
        cbSingleData({
            label: item.label,
            checked: item.checked
        });
    }
};

// 向上联动
const upwardLinkage = (data, treeData) => {
    let pId = data.pId;
    if (pId === 0) return;
    let samePidData = treeData.filter(t => (t.pId == pId) && !t.toggleDisabled);

    let samePidDataStatus = samePidData.every(s => s.checked === true);
    let samePidNoCheckStatus = samePidData.every(s => !s.checked);

    let fatherData = treeData.filter(t => t.id == pId);

    // 子集全勾 -> 父级checked:true
    if (samePidDataStatus) {
        fatherData[0].checked = true;
    }
    // 子集全未勾 -> 父级checked:false
    if (samePidNoCheckStatus) {
        fatherData[0].checked = false;
    }
    // 子集未全勾 -> 父级checked:half
    if (!samePidNoCheckStatus && !samePidDataStatus) {
        fatherData[0].checked = "half";
    }
    upwardLinkage(fatherData[0], treeData)
}

// 向下联动
const downwardLinkage = (children, status) => {
    children.map(c => {
        c.checked = status;
        if (c.children) {
            downwardLinkage(c.children, status);
        }
    })
}
// 获取所有勾选数据
const getCheckAllData = (data, allData = []) => {
    data.map(t => {
        if ((!t.toggleDisabled && t.checked === true)) {
            let find = allData.find(r => r.id == t.id)
            if (!find) {
                allData.push(t)
            }
            if (t.children) {
                getCheckAllData(t.children, allData)
            }
        }
    });
    return allData;
}