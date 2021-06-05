import Product from '../models/Product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Red Shirt',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_960_720.jpg',
    'A red t-shirt, perfect for days with non-red weather',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Blue Carpet',
    'https://images.pexels.com/photos/5537559/pexels-photo-5537559.jpeg',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Coffee Mug',
    'https://cdn.pixabay.com/photo/2017/10/13/15/29/coffee-2847957_960_720.jpg',
    'Can also be used for tea!',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'The book - Limited Edition',
    'https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088775_960_720.jpg',
    "What the content is this? Why shpuld that matter? It's a limited edition!",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'https://cdn.pixabay.com/photo/2015/11/19/11/45/macbook-pro-1050973_960_720.jpg',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Pen & Paper',
    'https://cdn.pixabay.com/photo/2016/11/22/23/09/fountain-pen-1851096_960_720.jpg',
    "Can be used for role-playing (Not the kind of role-playing you're thinking.",
    5.49
  ),
];

export default PRODUCTS;
