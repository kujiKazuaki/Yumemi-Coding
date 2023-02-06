/**
 * @description 選択した都道府県の人口増減のデータのみを返す関数
 * @param {*} code_pref //都道府県を表す引数
 * @returns
 */

export const url_demographics = (code_pref) => {
  const result = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${code_pref}&cityCode=-`
  return result
}
