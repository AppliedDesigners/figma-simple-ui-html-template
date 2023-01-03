interface IMessageInput {
  type: string,
  value: string | number[]
}

const insertText = async (value: string) => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" })
  const textNode = figma.createText()
  
  textNode.characters = value
  figma.currentPage.appendChild(textNode);

  figma.viewport.scrollAndZoomIntoView([textNode]);
}

const insertPieChart = async (value: number[]) => {
  const width = 100
  const height = 100

  const frame = figma.createFrame()
  figma.currentPage.appendChild(frame)
  frame.resizeWithoutConstraints(width, height)

  const segmentsTotal = value.reduce((memo, segment) => memo + segment, 0)
  
  let start = 0;

  for (const num of value) {
    const color = Math.sqrt(start / segmentsTotal)
    const ellipse = figma.createEllipse()
    frame.appendChild(ellipse)
    ellipse.resizeWithoutConstraints(width, height)
    ellipse.fills = [{ type: 'SOLID', color: {r: color, g: color, b: color} }]
    ellipse.constraints = {horizontal: 'STRETCH', vertical: 'STRETCH'}
    ellipse.arcData = {
      startingAngle: (start / segmentsTotal - 0.25) * 2 * Math.PI,
      endingAngle: ((start + num) / segmentsTotal - 0.25) * 2 * Math.PI,
      innerRadius: 0,
    }
    start += num
  }

  figma.viewport.scrollAndZoomIntoView([frame]);
}

figma.showUI(__html__)

figma.ui.onmessage = async ({ type, value }: IMessageInput) => {
  if (type === 'text') {
    await insertText(value as string)
  } else if (type === 'pie-chart') {
    await insertPieChart(value as number[])
  } else {
    figma.notify(`Unsupported type: ${type}`, {error: true})
  }

  figma.closePlugin()
}