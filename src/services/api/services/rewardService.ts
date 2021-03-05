export type Reward = {
  id: string
  active: boolean
  title: string
  minSpend: number
  image: string
}

export default {
  async findAll(): Promise<Reward[]> {
    const rewards: Reward[] = [
      {
        id: '1',
        active: true,
        title: 'Get free shipping',
        minSpend: 50,
        image: require('@/assets/img/free-shipping.png')
      },
      {
        id: '2',
        active: true,
        title: 'Get a free Shinū Dish',
        minSpend: 200,
        image: 'https://cdn.shopify.com/s/files/1/0424/9583/6319/products/Shinu_960x.jpg'
      }
    ]
    return new Promise(resolve => setTimeout(() => resolve(rewards), 5000))
  }
}
