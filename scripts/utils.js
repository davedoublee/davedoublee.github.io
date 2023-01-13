let CANVAS_HEIGHT = 0
let CANVAS_WIDTH = 0

function setupCanvasSize(canvas, minimumHeight) {
    if (minimumHeight == null) minimumHeight = innerHeight
    CANVAS_HEIGHT = Math.max(innerHeight + 35 * 2, minimumHeight)
    CANVAS_WIDTH = innerWidth
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    canvas.setAttribute('width', CANVAS_WIDTH)
    canvas.setAttribute('height', CANVAS_HEIGHT)
}

function getPercentXFromCenter(x) {
    const totalWidth = document.documentElement.clientWidth
    const currentXPercent = x / totalWidth - 0.5
    return currentXPercent
}
function getPercentYFromCenter(y) {
    const totalHeight = CANVAS_HEIGHT
    const currentYPercent = y / totalHeight - 0.5
    return currentYPercent
}