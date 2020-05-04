module.exports = function formatSpreadSheetData (data) {
  return data.split('\n')
    .reduce((acc, cur) => {
      let [question, type] = cur.split('\t')
      question = question.replace(/\d+\.\s?/, '')
      return acc.concat({ question, type })
    }, [])
}
