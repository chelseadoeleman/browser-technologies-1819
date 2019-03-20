
import adventure from '../../assets/images/adventure.jpg'
import animals from '../../assets/images/animals.jpg'
import dragon from '../../assets/images/dragon.jpg'
import fantasy from '../../assets/images/fantasy.jpg'
import horror from '../../assets/images/horror.jpg'
import princess from '../../assets/images/princess.jpg'
import soccer from '../../assets/images/soccer.jpg'
import sports from '../../assets/images/sports.jpg'
import world from '../../assets/images/world.jpg'
import { getAverageRGB } from '../utils/getColor'
import { queryState } from '../utils/getQueryState'
import { Loader } from '../utils/Loader';

export const handleGenreRoute = (main, router) => {
    return async () => {
        main.innerHTML = ''

        Loader.toggleLoader()
        const root = document.documentElement
        const headingElement = document.createElement('h1')
        const sectionElement = document.createElement('section')
        const logo = document.querySelector('.logo')
        logo.addEventListener('click', () => {
            router.navigate('/')
        })

        
        sectionElement.classList.add('genre-wrapper')
        headingElement.innerText = 'Welk plaatje spreekt jou het meest aan?'
        const genres = [
            { alt: 'Avontuur', url: adventure, query: 'facet=genre(science-fiction)'}, 
            { alt: 'Dieren', url: animals, query: 'facet=genre(dieren)'}, 
            { alt: 'Draak', url: dragon, query: 'facet=genre(avonturenroman)'}, 
            { alt: 'Fantasie', url: fantasy, query: 'facet=topic(sprookjesfiguren)'}, 
            { alt: 'Spanning', url: horror, query: 'facet=genre(detective)'}, 
            { alt: 'Prinses', url: princess, query: 'facet=topic(verliefdheid)'}, 
            { alt: 'Voetbal', url: soccer, query: 'facet=topic(voetbal)'}, 
            { alt: 'Spelen', url: sports, query: 'facet=topic(vriendschap)'},
            { alt: 'De wereld', url: world, query: 'facet=genre(stripverhaal)'}
        ]
        
        genres.forEach(genre => {
            const genreItem = document.createElement('img')
            const link = document.createElement('a')
            const article = document.createElement('article') 
            
            genreItem.setAttribute('src', genre.url)
            genreItem.setAttribute('alt', genre.alt)
            genreItem.addEventListener('load', () => {
                const data = getAverageRGB(genreItem)                  

                const color = `rgb(${data.r}, ${data.g}, ${data.b})`

                genreItem.addEventListener('click', () => {
                    root.style.setProperty('--colors', color)
                })
                genreItem.addEventListener('click', () => {
                    queryState.push(genre.query)
                })
            })

            // const go = router.navigate('/format')

            // const goToFormat = link.addEventListener('click', () => {
            //     router.navigate('/format')
            // })

            link.setAttribute('href', go)

            link.appendChild(genreItem) 
            article.appendChild(link)
            sectionElement.appendChild(article)
        })
        
        main.appendChild(headingElement)
        main.appendChild(sectionElement)

        Loader.toggleLoader()
    }
}