import { useAppStore } from '../../../src/store/useAppStore'

vi.mocked(useAppStore).mockReturnValue({
  templates: [],
  selectedTemplate: null,
  setSelectedTemplate: vi.fn(),
}) 