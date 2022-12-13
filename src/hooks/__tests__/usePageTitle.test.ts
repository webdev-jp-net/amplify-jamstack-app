import { cleanup, renderHook } from '@testing-library/react'
import { usePageTitle } from '../usePageTitle'
describe('usePageTitleのテスト', () => {
  beforeEach(() => {
    cleanup()
  })
  it('usePageTitleの機能テスト', () => {
    const { result } = renderHook(() => {
      return usePageTitle()
    })
    // expect().toBe()
  })
})
