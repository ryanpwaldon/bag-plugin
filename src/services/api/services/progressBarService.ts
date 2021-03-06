export type ProgressBar = {
  id: string
  active: boolean
  title: string
  goal: number
  image: string
  completionMessage?: string
}

export default {
  async findAll(): Promise<ProgressBar[]> {
    const progressBars: ProgressBar[] = [
      {
        id: '1',
        active: true,
        title: 'Get free shipping',
        goal: 50,
        image: require('@/assets/img/free-shipping.png')
      },
      {
        id: '2',
        active: true,
        title: 'Get a free Shinū Dish',
        goal: 200,
        image: 'https://cdn.shopify.com/s/files/1/0424/9583/6319/products/Shinu_960x.jpg',
        completionMessage: 'Your gift will be included in your delivery'
      }
    ]
    return new Promise(resolve => setTimeout(() => resolve(progressBars), 5000))
  }
}
