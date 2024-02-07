let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let productosCarrito = [];

class Zapatillas {
  constructor(id, marca, modelo, precio, imagen, envioGratis) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.imagen = imagen;
    this.envioGratis = envioGratis;
  }
}

const zapatilla1 = new Zapatillas(1, "Adidas", "Superstar", 67999, "../assets/image/adidas_superstar.avif", "Envio Gratis");
const zapatilla2 = new Zapatillas(2, "Nike", "Air Force 1", 80000, "../assets/image/nike_air_force_1.jpg", "Envio Gratis");
const zapatilla3 = new Zapatillas(3, "Converse", "Chuck Taylor All Star", 98600, "../assets/image/converse_chuck_taylor.jpg", "Envio Gratis");
const zapatilla4 = new Zapatillas(4, "Puma", "Suede Classic", 215000, "../assets/image/puma_suede_classic.jpg", "Envio Gratis");
const zapatilla5 = new Zapatillas(5, "Reebok", "Classic Leather", 176500, "../assets/image/reebok_classic_leather.jpg", "Envio Gratis");
const zapatilla6 = new Zapatillas(6, "Vans", "Old Skool", 64400, "../assets/image/vans_old_skool.jpg ", "Envio Gratis");

const zapatillas = [zapatilla1, zapatilla2, zapatilla3, zapatilla4, zapatilla5, zapatilla6];

function mostrar_catalogo() {
  let containerZapatillas = document.getElementById("catalogoHTML");
  containerZapatillas.innerHTML = "";
  for (const zapatilla of zapatillas) {
    let zapatillaDiv = document.createElement("div");
    zapatillaDiv.className = "col-md-6 col-lg-4 my-2";
    zapatillaDiv.innerHTML = `
      <div id="${zapatilla.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="width: 450px;" src="assets/${zapatilla.imagen}" alt="${zapatilla.marca} ${zapatilla.modelo}">
        <div class="card-body">
          <p> ${zapatilla.marca} ${zapatilla.modelo}</p>
          <p class="${zapatilla.precio}">Precio: ${zapatilla.precio}</p>
          <p class=" text-end" style="font-size:15px;" > ${zapatilla.envioGratis}</p>
          <button id="btnCompra${zapatilla.id}" class="btn btn">Agregar al carrito</button>
        </div>
      </div>`;
    containerZapatillas.append(zapatillaDiv);
    let btnCompra = document.getElementById(`btnCompra${zapatilla.id}`);
    btnCompra.addEventListener("click", () => {
      agregarAlCarrito(zapatilla);
    });
  }
}

function mostrar_catalogoHTML(zapatilla) {
  return `
    <div class="col-8 col-md-6" style="width:300px; padding-top:20px;">
      <div class="card">
        <img src="assets/${zapatilla.imagen}" class="card-img-top" alt="${zapatilla.marca} ${zapatilla.modelo}">
        <div class="card-body">
          <p class="${zapatilla.precio}">Precio: ${zapatilla.precio}</p>
          <button id="btnCompra${zapatilla.id}" class="btn btn-primario">Agregar al carrito</button>
        </div>
      </div>
    </div>`;
}

function mostrar_catalogoBusqueda(zapatillas_encontradas) {
  const catalogoNODOS = document.getElementById("catalogoHTML");
  let catalogoHTML = "";
  if (zapatillas_encontradas.length > 0) {
    for (const zapatilla of zapatillas_encontradas) {
      catalogoHTML += mostrar_catalogoHTML(zapatilla);
    }
  } else {
    catalogoHTML = `
    <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-12  ">
        <div class="text-white text-center" style="font-size:40px !important;">Lo siento, el producto que has buscado no se encuentra en nuestro stock.😭</div>
      </div>
    </div>
  </div>
  <br>
  `;
  }
  catalogoNODOS.innerHTML = catalogoHTML;
}

function agregarAlCarrito(elemento) {
  let zapatillaAgregada = productosCarrito.find(zapatilla => zapatilla.id == elemento.id);
  if (zapatillaAgregada === undefined) {
    productosCarrito.push(elemento);
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
    actualizarModalCarrito();
  } else {
    Swal.fire({
      icon: "error",
      title: "Lo siento, no puedes agregar más de un producto.",
    });
  }

  document.getElementById("contar-items").innerHTML = productosCarrito.length;
}

function buscarZapatillas(terminoBusqueda) {
  terminoBusqueda = terminoBusqueda.toLowerCase();
  const zapatillasEncontradas = zapatillas.filter(zapatilla =>
    zapatilla.marca.toLowerCase().includes(terminoBusqueda) ||
    zapatilla.modelo.toLowerCase().includes(terminoBusqueda)
  );
  mostrar_catalogoBusqueda(zapatillasEncontradas);
}

document.getElementById("buscar_Btn").addEventListener("click", () => {
  let busquedaInput = document.getElementById("busquedaInput");
  buscarZapatillas(busquedaInput.value);
});

document.getElementById("busquedaInput").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    let busquedaInput = document.getElementById("busquedaInput");
    buscarZapatillas(busquedaInput.value);
  }
});

mostrar_catalogo();
