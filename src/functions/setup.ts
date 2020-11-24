import pluginService from '@/services/api/services/pluginService'

export default async () => {
  const settings = await pluginService.findSettings()
  console.log(settings)
  return settings
}
