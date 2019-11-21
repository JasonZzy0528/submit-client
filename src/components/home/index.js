import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { Diff2Html } from 'diff2html'
import 'diff2html/dist/diff2html.min.css'

const { TextArea } = Input

const formatDiff = diffText => {
  const list = diffText.split('\n')
  const result = []
  let newTextLines = 0
  let oldTextLines = 0
  for (let line of list) {
    if (line.startsWith('+')) {
      newTextLines++
      line = `+ ${line.substring(1, line.length)}`
      result.push(line)
    } else if (line.startsWith('-')) {
      oldTextLines++
      line = `- ${line.substring(1, line.length)}`
      result.push(line)
    } else {
      newTextLines++
      oldTextLines++
      result.push(` ${line}`)
    }
  }
  return {
    result: result.join('\n'),
    numbers: {
      new: newTextLines,
      old: oldTextLines
    }
  }
}

const Home = () => {
  const [value, setValue] = useState('')
  const [diffPanel, setDiffPanel] = useState(
    {
      __html: ''
    }
  )

  const onChange = e => {
    setValue(e.target.value)
  }

  const onClick = () => {
    const { result, numbers } = formatDiff(value)
    const diff = `--- a/output.txt\n+++ b/output.txt\n@@ -1,${numbers.old} +1,${numbers.new} @@\n${result}`

    const html = Diff2Html.getPrettyHtml(diff, {
      inputFormat: 'diff',
      matching: 'lines',
      outputFormat: 'line-by-line'
    })

    setDiffPanel(
      {
        __html: html
      }
    )
  }
  return (
    <>
      <h3>Submit</h3>
      <TextArea
        value={value}
        onChange={onChange}
      />
      <Button
        type="primary"
        size="small"
        onClick={onClick}
      >
        Submit
      </Button>
      <div dangerouslySetInnerHTML={diffPanel} />
    </>
  )
}

export default Home
