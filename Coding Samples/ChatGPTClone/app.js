const API_KEY = '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'
const submitButton = document.querySelector('#submit')
const OutPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement =  document.querySelector('button')

function changeInput(value)
{
    const inputElement = document.querySelector('input')
    inputElement.value = value;
}

async function getMessage()
{
    console.log('clicked');
    const options = 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: inputElement.value}],
        max_tokens: 100
                        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json();
        console.log(data);
        OutPutElement.textContent = data.choices[0].message.content;
        if (data.choices[0].message.content)
        {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement);
        }
    }
    catch (error)
    {
        console.error(error);
    }
}

function clearInput ()
{
    inputElement.value = '';
}

submitButton.addEventListener('click', getMessage)

buttonElement.addEventListener('click', clearInput)