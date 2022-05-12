export function saveConfig(
  successFly: boolean,
  nameFly: string,
  dateFly: Date[] | undefined,
  pageNum: number
) {
  let tempData = {
    successFly: successFly,
    nameFly: nameFly,
    dateFly: dateFly,
    pageNum: pageNum,
  };
  window.sessionStorage.setItem('config', JSON.stringify(tempData));
}
