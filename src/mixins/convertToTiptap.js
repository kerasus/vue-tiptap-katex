const mixinConvertToTiptap = {
    data () {
        return {
            poems: []
        }
    },
    methods: {
        convertToTiptap(string) { //call this function when you want to convert pure HTML to tiptap format
            string = string.replaceAll('¬', '&#8202;')
            string = this.convertHTMLKatexToInteractive(string)
            string = this.convertHTMLReadingToInteractive(string)
            string = this.convertHTMLImageToInlineInteractive(string)
            string = this.convertHTMLImageToInteractive(string)
            string = this.convertHTMLPoemToInteractive(string)
            return string
        },
        convertHTMLPoemToInteractive(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let poemParent = wrapper.querySelectorAll('.beit')
            poemParent.forEach((item) => {
                let poem1 = item.childNodes[0].innerHTML, poem2 = item.childNodes[1].innerHTML
                let poemHTML =
                    '<tiptap-interactive-poem><mesra>' + poem1 + '</mesra><mesra>' + poem2 + '</mesra></tiptap-interactive-poem>'
                var poemWrapper = document.createElement('div')
                poemWrapper.innerHTML = poemHTML
                item.replaceWith(poemWrapper)
            })
            return wrapper.innerHTML
        },
        convertHTMLReadingToInteractive(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let poemParent = wrapper.querySelectorAll('.reading-duplicate')
            poemParent.forEach(item => {
                let poemHTML =
                    '<tiptap-interactive-reading>' + item.innerHTML + '</tiptap-interactive-reading>'
                var poemWrapper = document.createElement('div')
                poemWrapper.innerHTML = poemHTML
                item.parentElement.replaceWith(poemWrapper)
            })
            return wrapper.innerHTML
        },
        convertHTMLImageToInteractive(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let imagesParent = wrapper.querySelectorAll('img')
            imagesParent.forEach(item => {
                let imageHTML = item.attributes[0].nodeValue
                if (imageHTML) {
                    let justify = 'center'
                    if (item.parentElement.style.display === 'flex') {
                        if (item.parentElement.style.justifyContent === 'flex-start') {
                            justify = 'right'
                        } else if (item.parentElement.style.justifyContent === 'center') {
                            justify = 'center'
                        } else if (item.parentElement.style.justifyContent === 'flex-end') {
                            justify = 'left'
                        }
                    }
                    imageHTML =
                        '<tiptap-interactive-image-upload-inline' +
                        ' url="' + item.attributes['src'].nodeValue + '" ' +
                        'width="' + item.attributes['width'].nodeValue + '" ' +
                        'height="' + item.attributes['height'].nodeValue + '" ' +
                        'justify="' + justify + '"' +
                        '></tiptap-interactive-image-upload-inline>'
                    var imageWrapper = document.createElement('div')
                    imageWrapper.innerHTML = imageHTML
                    if (item.parentElement.style.display === 'flex') {
                        item.parentElement.replaceWith(imageWrapper)
                    } else {
                        item.replaceWith(imageWrapper)
                    }
                }
            })
            return wrapper.innerHTML
        },
        convertHTMLImageToInlineInteractive(string) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = string
            let imagesParent = wrapper.querySelectorAll('span img')
            imagesParent.forEach(item => {
                let imageHTML = item.attributes[0].nodeValue
                if (imageHTML) {
                    let marginBottom = 0
                    if (item.style.marginBottom) {
                        marginBottom = item.style.marginBottom.slice(0, -2)
                    }
                    imageHTML =
                        '<tiptap-interactive-image-upload-inline' +
                        ' url="' + item.attributes['src'].nodeValue + '" ' +
                        'width="' + item.attributes['width'].nodeValue + '" ' +
                        'height="' + item.attributes['height'].nodeValue + '" ' +
                        'vertical="' + marginBottom + '" ' +
                        'justify="center"' +
                        '></tiptap-interactive-image-upload-inline>'
                    var imageWrapper = document.createElement('span')
                    imageWrapper.innerHTML = imageHTML
                    item.parentElement.replaceWith(imageWrapper)
                }
            })
            return wrapper.innerHTML
        },
        convertHTMLKatexToInteractive(string) {
            string = string.replaceAll('\\[ ', '\\[')
            string = string.replaceAll(' \\]', ' \\]')
            string = string.replaceAll(' $', '$')
            string = string.replaceAll('$ ', '$')

            // let regex = /((\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])|(\$((?! ).){1}((?!\$).)*?((?! ).){1}\$))/gms;
            let regex = /(\${1}((?!\$).)+?\${1})|(\${2}((?!\$).)+?\${2})|(\\\[((?! ).){1}((?!\$).)*?((?! ).){1}\\\])/gms;
            string = string.replace(regex, (match) => {
                let finalMatch
                if (match.includes('$$')) {
                    finalMatch = match.slice(2, -2)
                } else if (match.includes('$')) {
                    finalMatch = match.slice(1, -1)
                } else {
                    finalMatch = match.slice(2, -2)
                }
                return '<tiptap-interactive-katex-inline katex="' + finalMatch + '"></tiptap-interactive-katex-inline>'
            })
            return string
        },
    }
}

export default mixinConvertToTiptap
