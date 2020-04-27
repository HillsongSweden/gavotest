const form = document.querySelector('#app')
initApp()

form.addEventListener('submit', e => {
  e.preventDefault()
  const fd = new FormData(e.target)
  const answerData = Object.fromEntries(fd)

  const giftScores = Object
    .keys(answerData)
    .reduce((acc, cur) => {
      const [type] = cur.split('@')
      const score = parseInt(answerData[cur])
      acc[type] = acc[type] !== undefined
        ? (acc[type] + score)
        : score
      return acc
    }, {})

  const topGifts = Object.entries(giftScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(x => x[0])

  const descriptionOutput = topGifts.map(gift => {
    console.log(gift)
    return descriptions[gift]
  }).join('<hr>')


  form.innerHTML = `
    <h1>Your top gifts are ${topGifts.join(', ')}</h1>
    <div class="description">${descriptionOutput}</div>
    <button
      type="button"
      onclick="initApp()">
      Börja om
    </button>
  `
})

function initApp () {
  const questionOutput = questions.map((q, i) => {
    const questionId = q.type + '@' + i

    return `
      <fieldset>
        <label for="${questionId}">
          ${q.question}
        </label>
        <input
          id="${questionId}"
          name="${questionId}"
          type="range"
          value="0"
          min="0"
          max="3">
      </fieldset>
    `
  }).join('')

  form.innerHTML = `
    <h1>Vilka är dina andliga gåvor?</h1>
    ${questionOutput}
    <button type="submit">Skicka</button>
    `
  }
    </div>
  );
}
