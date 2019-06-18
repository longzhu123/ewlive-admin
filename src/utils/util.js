let util = {
  /**
   * 将对象数组里面,指定的属性拼接成一个list
   * @param soureArray  对象数组
   * @param filedName  指定的属性名
   */
  convertArrayToFiledList: (soureArray, filedName) => {
    let dataArray = [];
    for (let item of soureArray) {
      dataArray.push(item[filedName]);
    }
    return dataArray;
  }
};

export default util;
