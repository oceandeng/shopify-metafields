import CustomCollectionsImage from '@/assets/metafields_03.png'
import ProductsAndVariantsImage from '@/assets/metafields_08.png'
import CustomersImage from '@/assets/metafields_10.png'
import OrdersImage from '@/assets/metafields_12.png'
import PagesImage from '@/assets/metafields_14.png'
import BlogsAndPostsImage from '@/assets/metafields_16.png'
import ShopImage from '@/assets/metafields_18.png'

export default [
  {
    id: 1,
    ownerResource: 'collections',
    apiPath: 'shopify/custom_collections',
    title: 'Custom Collections',
    description: 'Manual collection supported',
    exportOwnerResource: 'custom_collections',
    metafieldsName: 'collection',
    image: CustomCollectionsImage
  },
  {
    id: 2,
    ownerResource: 'collections',
    apiPath: 'shopify/smart_collections',
    title: 'Smart Collections',
    description: 'Automated collection supported',
    exportOwnerResource: 'smart_collections',
    metafieldsName: 'collection',
    image: CustomCollectionsImage
  },
  {
    id: 3,
    ownerResource: 'products',
    apiPath: 'shopifyGra/products',
    title: 'Products & Variants',
    description: 'Easily customize your products',
    exportOwnerResource: 'products',
    metafieldsName: 'product',
    image: ProductsAndVariantsImage
  },
  {
    id: 4,
    ownerResource: 'customers',
    apiPath: 'shopifyGra/customers',
    title: 'Customers',
    description: 'Edit additonal customer data',
    exportOwnerResource: 'customers',
    metafieldsName: 'customer',
    image: CustomersImage
  },
  {
    id: 5,
    ownerResource: 'draft_orders',
    apiPath: 'shopify/draft_orders',
    title: 'Draft Orders',
    description: 'Draft orders included',
    exportOwnerResource: 'draft_orders',
    image: OrdersImage
  },
  {
    id: 6,
    ownerResource: 'orders',
    apiPath: 'shopifyGra/orders',
    title: 'Orders',
    description: 'Add and manage the more infromation on your store orders',
    exportOwnerResource: 'orders',
    metafieldsName: 'order',
    image: OrdersImage
  },
  {
    id: 7,
    ownerResource: 'pages',
    apiPath: 'shopify/pages',
    title: 'Pages',
    description: 'Use more space for development',
    exportOwnerResource: 'pages',
    metafieldsName: 'page',
    image: PagesImage
  },
  {
    id: 8,
    ownerResource: 'blogs',
    apiPath: 'shopify/blogs',
    title: 'Blogs & Posts',
    description: 'Add important details for your news',
    exportOwnerResource: 'blogs',
    metafieldsName: 'blog',
    image: BlogsAndPostsImage
  },
  {
    id: 9,
    ownerResource: 'shop',
    title: 'Shop',
    description: 'Personalize your store without limiations',
    exportOwnerResource: 'shop',
    metafieldsName: 'shop',
    image: ShopImage
  }
]