const generatePokemons = (getSort, pageNumber, getType) => {
    
    const pokedex = document.querySelector('.pokedex')
    const promises = []
    pokesNumber = 80 //When you change this value, more or less pokemons will be fetched

    const fetchPokemon = () => {

        Promise.all(promises).then((data) => {
            const pokemon = data.map((data) => ({
                name: data.name,
                id: data.id,
                type: data.types.map((type) => type.type.name).join(', '),
                speed: data.stats[0].base_stat,
                defense: data.stats[3].base_stat,
                attack: data.stats[4].base_stat,
            }))
            //console.log(pokemon)
            displayPokemon(pokemon, pageNumber, getType)
        })
    }

    const fetchAll = (pokemonsNumber) => {
        for (let i = 1; i <= pokemonsNumber; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`
            promises.push(fetch(url).then((res) => res.json()))
        }
        fetchPokemon()
    }

    const displayPokemon = (pokemon, page, getType) => {

        const types = pokemon.map(a => a.type)

        for(let i=0; i<types.length; i++) {
            const n = types[i].indexOf(',')
            types[i] = types[i].substring(0, n != -1 ? n : types[i].length)
        }

        const typesNoDuplicates = Array.from(new Set(types))
        
        if(getType!="all") {
                const typeFilter = pokemon.filter(pokemon => {
                return pokemon.type.includes(getType) 
            })

        //console.log(getType)

            pokemon=typeFilter
            const numberOfPages = Math.ceil(pokesNumber/12)
            pokesNumber=pokemon.length
            const disabledPages=Math.ceil(pokesNumber/12)

            for(let i=disabledPages+1; i<=numberOfPages; i++) {
            document.querySelector(`.page-item[data-value='${i}']`).classList.add('hidden')
            }
        //console.log(pokesNumber)
        }

        const numberOfPages = Math.ceil(pokesNumber/12)
        for(let i=1; i<=numberOfPages; i++) {
            document.querySelector(`.page-item[data-value='${i}']`).classList.remove('hidden')
        }

        sortType(pokemon, getSort)
        const startSlice = (page-1)*12
        const endSlice = -1*(pokesNumber-startSlice-12)

        if(startSlice >= pokesNumber-12){
            pokemon = pokemon.slice(startSlice)
        }
        else {
            pokemon = pokemon.slice(startSlice, endSlice)
        }    
       
        const pokemonData = pokemon.map(
                (pokemonData) => `
                    <section class="card animation">
                        <div class="card" data-content="pokemon" data-type="${pokemonData.type}">
                            <h1 class="card-id"><span class="hash">#</span>${pokemonData.id}</h1>
                            <img class="card-image" src="https://pokeres.bastionbot.org/images/pokemon/${pokemonData.id}.png"/>
                        </div>
                        <header>
                            <h4 class="card-title">${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name.slice(1)}</h4>
                            <div class="btn-group">
                                <button class="btn-sm mr-2 disabled" data-type="${(pokemonData.type.substring( 0, pokemonData.type.indexOf(","))).replace(/[^a-zA-Z ]/g, "")}">${(pokemonData.type.substring( 0, pokemonData.type.indexOf(","))).replace(/[^a-zA-Z ]/g, "")}</button>
                                <button class="btn-sm disabled" data-type="${pokemonData.type.substring( pokemonData.type.indexOf(",")).replace(/[^a-zA-Z ]/g, "").trim()}">${pokemonData.type.substring( pokemonData.type.indexOf(",")).replace(/[^a-zA-Z ]/g, "").trim()}</button>
                            </div>
                        </header>
                        <hr>

                        <article class="container">
                            <div class="row">
                                <div class="col-4">
                                    <p class="card-text">
                                        <i class="fas fa-fire fa-2x"></i>
                                    </p>
                                    
                                    <div class="centerBlock">   
                                        <div class="circle" data-fill="${pokemonData.attack}" hour style="--color:#ef5350">
                                            <span>${pokemonData.attack}</span>
                                            <div class="bar"></div>
                                        </div>
                                    
                                        <p class="card-text">ATTACK</p>
                                    </div>
                                </div>

                                <div class="col-4">
                                    <p class="card-text">
                                        <i class="fas fa-running fa-2x"></i>
                                    </p>

                                    <div class="centerBlock">
                                        <div class="circle" data-fill="${pokemonData.speed}" hour style="--color:#4fc3f7">
                                            <span>${pokemonData.speed}</span>
                                            <div class="bar"></div>
                                        </div>
                                
                                        <p class="card-text">SPEED</p>
                                    </div>
                                </div>

                                <div class="col-4">
                                    <p class="card-text">
                                        <i class="fas fa-shield-alt fa-2x"></i>
                                    </p>

                                    <div class="centerBlock">
                                        <div class="circle" data-fill="${pokemonData.defense}" hour style="--color:#66bb6a">
                                            <span>${pokemonData.defense}</span>
                                            <div class="bar"></div>
                                        </div>

                                        <p class="card-text">DEFENSE</p>
                                    </div> 
                                </div>   
                                    
                        </article>
                        
                    </section>
                    `
            )
            .join('')

            //console.log(pokemon)

        pokedex.innerHTML = pokemonData
            
        const selectSize = document.getElementById("type").length
        const selectTypes = []

        for(let i=0; i<selectSize-1; i++) {
            const o = document.querySelector(`.option-type[data-value="${i}"]`)
            const v = o.getAttribute("value")
            selectTypes.push(v)
        }
        //console.log(selectTypes)

        const difference = selectTypes.filter(x => !typesNoDuplicates.includes(x))
        //console.log(difference)

        for(let i=0; i<=selectTypes.length; i++) {
            const o = document.querySelector(`.option-type[data-value="${i}"]`)
            for(let j=0; j<difference.length; j++) {
                if(difference[j]==selectTypes[i]) {
                    o.setAttribute("disabled", '')
                }
            }
        }
    }

    const sortType = (pokemon, type) => {

        if (type == 'attack') {
            pokemon.sort(function (a, b) {
                return a.attack - b.attack
            })
        }
        else if (type == 'defense') {
            pokemon.sort(function (a, b) {
                return a.defense - b.defense
            })
        }
        else if (type == 'speed') {
            pokemon.sort(function (a, b) {
                return a.speed - b.speed
            })
        }
        else {
            pokemon.sort(function (a, b) {
            return a.id - b.id
            })
        }
    }

    fetchAll(pokesNumber)
}

const generatePages = () => {
        
    const ul = document.querySelector('.pagination')
    const numberOfPages = Math.ceil(pokesNumber/12)
    
    const generateElements = (i, a, status) => {

        li = document.createElement("li")
        a = document.createElement("a")

        a.appendChild(document.createTextNode(i))
        li.appendChild(a)
        ul.appendChild(li)
        a.setAttribute("class", "page-link")
        li.setAttribute("class", "page-item")
        li.setAttribute("data-value", i)

        if(status==true) {
            li.setAttribute("data-status", "a")
            li.classList.add('active')
        }
    }

    for(let i=1; i<=numberOfPages; i++) {
        const a = document.createElement("a")

        if (i==1) {
            generateElements(i, a, true)
            
        }
        else {
            generateElements(i, a)
        }
    }
}

generatePokemons('id', 1, 'all')

generatePages()

const deactivePages = (page) => {

    document.querySelector(`.page-item[data-value='1']`).classList.add('active')
    if(page!=1) {
        document.querySelector(`.page-item[data-value='${page}']`).classList.remove('active')
    }
    return page

}


const gotta = document.querySelector('.btn[data-type="gotta"]')

const catchEmAll = gotta.addEventListener('click', (e) => {

    document.getElementById("sort").selectedIndex = 0
    document.getElementById("type").selectedIndex = 0
    document.querySelector(`.page-item[data-value='1']`).classList.add('active')

    for (let i=2; i<=Math.ceil(pokesNumber/12); i++) {

        document.querySelector(`.page-item[data-value='${i}']`).classList.remove('active')
        
    }

    generatePokemons('id', 1, 'all')
})

const selectType = document.getElementById("type")

const getType = selectType.addEventListener('change', (e) => {
    
    const page = document.querySelector('.page-item[data-status="a"]').textContent
    const sortOption = document.getElementById("sort").value
    generatePokemons(sortOption, 1, e.target.value)
    
    deactivePages(page)
    
})

const selectSort = document.getElementById("sort")

const getSort = selectSort.addEventListener('change', (e) => {
    
    const page = document.querySelector('.page-item[data-status="a"]').textContent
    const typeOption = document.getElementById("type").value
    generatePokemons(e.target.value, 1, typeOption)
    
    deactivePages(page)
})

const selectPage = document.querySelector('.pagination')

const paging = selectPage.addEventListener('click', (e) => {
  
    window.scrollTo({top: 0, behavior: 'smooth'})
    const sortOption = document.getElementById("sort").value
    const typeOption = document.getElementById("type").value
    //console.log(sortOption)
    
    if(typeOption!="all") {
        generatePokemons(sortOption, e.target.text, typeOption)
    }

    else{
        generatePokemons(sortOption, e.target.text, "all")
    }

    document.querySelector(`.page-item[data-value='${e.target.text}']`).classList.add('active')
    document.querySelector(`.page-item[data-value='${e.target.text}']`).setAttribute("data-status", "a")

    const numberOfPages = Math.ceil(pokesNumber/12)
    const pagesDisabled = []
    for (let i=0; i<numberOfPages; i++) {
        pagesDisabled[i]=i+1
    }
    //console.log(pagesDisabled)
    pagesDisabled.splice( pagesDisabled.indexOf(e.target.text), 0 )
    for (let i=0; i<pagesDisabled.length; i++) {
        if(pagesDisabled[i]!=e.target.text){
        document.querySelector(`.page-item[data-value='${pagesDisabled[i]}']`).classList.remove('active')
        document.querySelector(`.page-item[data-value='${pagesDisabled[i]}']`).setAttribute("data-status", "")
        }
    }
})
