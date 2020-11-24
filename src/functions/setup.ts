import useCrossSells from '@/composables/useCrossSells'
import pluginService from '@/services/api/services/pluginService'
const { fetchCrossSells } = useCrossSells()

export default async () => {
  const settings = await pluginService.findSettings()
  fetchCrossSells()
}
