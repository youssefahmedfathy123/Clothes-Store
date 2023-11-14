let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || []



// 1

let generateShop = () => {             
  return (shop.innerHTML = shopItemsData.map((x)=>{


    
    let {id,name,price,desc,img} = x;
    let search = basket.find((x)=> x.id === id) || []
    return `
    <div class="item" id=product-id-${id}>
              <img width="220" src=${img} alt="">
              <div class="details">
                  <h3>${name}</h3>
                    <p>${desc}</p>
                       <div class="price-quantitiy">
                          <h2>${price}$</h2>
                          <div class="buttons">
                              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                              <div id=${id} class="quantity">
                              ${search.item === undefined? 0 : search.item}
                              </div>
                              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                              
                          </div>
                       </div>
              </div>
          </div>
  
    `
  }).join(""));
};

generateShop()


// 2
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id)
    
    if(search === undefined){
        basket.push({
            id: selectedItem.id ,
            item:1,
        }) 
        
    }else{
        search.item += 1;
    }
localStorage.setItem("data",JSON.stringify(basket));
update(selectedItem.id)
};


// 3
let decrement = (id) => {
let selectedItem = id;
let search = basket.find((x)=> x.id === selectedItem.id)
if(search === undefined) return;
else if(search.item === 0) return;
else{
    search.item -= 1;
}

update(selectedItem.id)
basket = basket.filter((x)=>x.item !== 0)
localStorage.setItem("data",JSON.stringify(basket));
};


// 4
let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};


// 5
let calculation =()=> {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y,0);
 }

 calculation()



 



