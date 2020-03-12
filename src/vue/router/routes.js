import Hello from './../../components/HelloWorld.vue'
import Anuncios from './../../components/advertisements/index.vue'
import NuevoAnuncio from './../../components/advertisements/new.vue'
import EditarAnuncio from './../../components/advertisements/edit.vue'
import Categorias from './../../components/categories/index.vue'
import NuevaCategoria from './../../components/categories/new.vue'
import EditarCategoria from './../../components/categories/edit.vue'
import Comercios from './../../components/commerces/index.vue'
import NuevoComercio from './../../components/commerces/new.vue'
import EditarComercio from './../../components/commerces/edit.vue'
import Cupones from './../../components/coupons/index.vue'
import NuevoCupon from './../../components/coupons/new.vue'
import EditarCupon from './../../components/coupons/edit.vue'
import Notificaciones from './../../components/notifications/index.vue'
import NuevaNotificacion from './../../components/notifications/new.vue'
import Ofertas from './../../components/offers/index.vue'
import NuevaOferta from './../../components/offers/new.vue'
import EditarOferta from './../../components/offers/edit.vue'
import Productos from './../../components/products/index.vue'
import NuevoProducto from './../../components/products/new.vue'
import EditarProducto from './../../components/products/edit.vue'


export default [
  { path: '/', component: Hello, name: 'root' },
  { path: '/anuncios', component: Anuncios, name: 'anuncios' },
  { path: '/anuncios/crear', component: NuevoAnuncio, name: 'crear_anuncio' },
  { path: '/anuncios/:id/editar', component: EditarAnuncio, name: 'editar_anuncio' },

  { path: '/categorias', component: Categorias, name: 'categorias' },
  { path: '/categorias/crear', component: NuevaCategoria, name: 'crear_categoria' },
  { path: '/categorias/:id/editar', component: EditarCategoria, name: 'editar_categoria' },

  { path: '/comercios', component: Comercios, name: 'comercios' },
  { path: '/comercios/crear', component: NuevoComercio, name: 'crear_comercio' },
  { path: '/comercios/:id/editar', component: EditarComercio, name: 'editar_comercio' },

  { path: '/cupones', component: Cupones, name: 'cupones' },
  { path: '/cupones/crear', component: NuevoCupon, name: 'crear_cupon' },
  { path: '/cupones/:id/editar', component: EditarCupon, name: 'editar_cupon' },

  { path: '/notificaciones', component: Notificaciones, name: 'notificaciones' },
  { path: '/notificaciones/crear', component: NuevaNotificacion, name: 'crear_notificacion' },

  { path: '/ofertas', component: Ofertas, name: 'ofertas' },
  { path: '/ofertas/crear', component: NuevaOferta, name: 'crear_oferta' },
  { path: '/ofertas/:id/editar', component: EditarOferta, name: 'editar_oferta' },

  { path: '/productos', component: Productos, name: 'productos' },
  { path: '/productos/crear', component: NuevoProducto, name: 'crear_producto' },
  { path: '/productos/:id/editar', component: EditarProducto, name: 'editar_producto' },

]
