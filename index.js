    const timeStamp = '1644436524';
    const apiKey= 'da6937036acda18c39534eeb574e2548';
    const md5 = '2e1757d681e65f61b0e23f36a059cd91';
    const div = document.querySelector('.container')
    const divComics = document.querySelector('.quadrinhos')
    const search =document.querySelector('.search')
    const buttonsearch = document.querySelector('.buttonSearch')
   
    fetch(`https://gateway.marvel.com:443/v1/public/comics?format=comic&limit=20&ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`)
    .then(response => {return response.json()})
    .then(data =>{
        data.data.results.forEach(element => {
            Showcomics(element)
        });
        
    })
    buttonsearch.addEventListener('click', (e) =>{
        divComics.textContent= ''
        if(!search.value){
            fetch(`https://gateway.marvel.com:443/v1/public/comics?format=comic&limit=20&ts=${timeStamp}&apikey=${apiKey}&hash=${md5}`)
            .then(response => {return response.json()})
            .then(data =>{
                data.data.results.forEach(element => {
                    Showcomics(element)
                });
            })
        }else{

            Api(search.value) 
        }
    })
    
    const Api = async (titulo)=>{
        try{
            const date= await fetch(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${titulo}&ts=${timeStamp}&apikey=${apiKey}&hash=${md5} `)
            const response =  await date.json()
            response.data.results.forEach(element => {
                Showcomics(element)
                
            })

        }catch(e){
            alert(e)
        }

   }
    const AbrirCarrinho = document.querySelector('.hiddenCompras')
    const ModalCompras = document.querySelector('.Carrinho')
    const Compras = document.createElement('div')
    const h1Compras = document.createElement('h2')
    ModalCompras.appendChild(Compras)

    Compras.appendChild(h1Compras)
    h1Compras.textContent = 'Cards'
    Compras.classList.add('Compras')
    let sacoladeCompras = []
    
   const Showcomics = (quadrinhos)=>{
        const Cards = document.createElement('div')
        Cards.classList.add("Cards")
        const title = document.createElement('h2')
        const divButtons = document.createElement('div')
        const buttonDescription = document.createElement('button')
        const buttonCompras= document.createElement('button')
        const img = document.createElement('img')
        
        
        divButtons.classList.add("divButton")
        buttonCompras.classList.add("buttonDescription")
        buttonDescription.classList.add("buttonDescription")
        
        img.src =  quadrinhos.thumbnail.path+'.'+quadrinhos.thumbnail.extension
        title.textContent = quadrinhos.title
        buttonCompras.textContent = 'Add Carrinho'
        buttonDescription.textContent = 'Descrição'
        buttonDescription.addEventListener('click', e =>{
            e.preventDefault()
            
            ModalOn(quadrinhos)
        })
        buttonCompras.addEventListener('click',e=>{
            e.preventDefault()
            sacoladeCompras.push(quadrinhos)
            QuantidadeCarrinho(sacoladeCompras.length)
            
        })
        divComics.appendChild(Cards)
        Cards.appendChild(img)
        Cards.appendChild(title)
        Cards.appendChild(divButtons)
        divButtons.appendChild(buttonDescription)
        divButtons.appendChild(buttonCompras)
   }
   
  

   

   const ListaCompras = (sacola)=>{
    
    const divCompra = document.createElement("div")
    Compras.appendChild(divCompra)
    const SairModal = document.createElement('button')
    SairModal.classList.add("SairModal")
    SairModal.textContent='sair '
    Compras.appendChild(SairModal)
    
   
    
    sacola.map(compra=>{
            
            const CardsCompras = document.createElement("div")
            const imgCompra = document.createElement("img")
            const tituloCompras = document.createElement("h2")
            const TirarSacola = document.createElement("button")
            const imgSair = document.createElement("img")
            CardsCompras.classList.add('CardsCompra')
            divCompra.appendChild(CardsCompras)

            CardsCompras.appendChild(imgCompra)
            CardsCompras.appendChild(tituloCompras)
            CardsCompras.appendChild(TirarSacola)
            TirarSacola.appendChild(imgSair)
            imgSair.src= './assets/remove-icon.svg'
            imgCompra.src = compra.thumbnail.path+'.'+compra.thumbnail.extension
            tituloCompras.textContent = compra.title
            TirarSacola.addEventListener('click' ,e =>{
                sacola.splice(sacola.indexOf(compra),1)
                RemoverCard(CardsCompras)
                QuantidadeCarrinho(sacola.length)
            })
        })
        
        
        ModalCompras.classList.add('ModalOn')
        divCompra.classList.add('DivCompras')

        SairModal.addEventListener('click',e=>{
            Compras.removeChild(divCompra)
            Compras.removeChild(SairModal)
            ModalCompras.classList.remove('ModalOn')
       })
       const  RemoverCard = (item)=>{
           
        divCompra.removeChild(item)
        
    }
       
   }
        
   //Description
   const Modal = document.querySelector('.hidden')
   
  
   const ModalOn = (descriçaoComics)=> {
    const DivDescription = document.createElement('div')
   const divTitle = document.createElement('div')
   const img = document.createElement('img')
   const title = document.createElement('h2')
   const description = document.createElement('p')
   const buttonComprass= document.createElement('button')
        DivDescription.classList.add('CardModal')
        Modal.appendChild(DivDescription)
        DivDescription.appendChild(img)
        DivDescription.appendChild(divTitle)
    
        divTitle.appendChild(title)
        divTitle.appendChild(description)
        divTitle.appendChild(buttonComprass)
   
        
        img.src =  descriçaoComics.thumbnail.path+'.'+descriçaoComics.thumbnail.extension

        title.textContent= descriçaoComics.title
        description.textContent = descriçaoComics.description
        
        buttonComprass.textContent = 'Add Carrinho'
        
        buttonComprass.addEventListener('click',e=>{
            e.preventDefault()
            
            sacoladeCompras.push(descriçaoComics)
            QuantidadeCarrinho(sacoladeCompras.length)
        })
    Modal.classList.add('ModalOn')   
    Modal.addEventListener('click', (e)=>{
       
        if(e.target === Modal){
           Modal.removeChild(DivDescription)
            Modal.classList.remove('ModalOn')
        }else{
            return;
        }
    })
   }
   
    const CloseModal = document.querySelector('.closeModal');
    const quantidade = document.createElement('p')
    quantidade.classList.add("tamanhoSacola")
    AbrirCarrinho.appendChild(quantidade)
   const QuantidadeCarrinho = (tamanho)=>{
    
    let tamanhoSacola =tamanho
    if(tamanhoSacola===0){
        quantidade.textContent= ''
    }else{
    quantidade.textContent= tamanhoSacola
    }
   }
   

    AbrirCarrinho.addEventListener('click', e=>{
        e.preventDefault()
        if(e.target === AbrirCarrinho)
        
        ListaCompras(sacoladeCompras)
        
    })
    