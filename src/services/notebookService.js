import xhr from './xhr/'
/**
 * 留言板所用到的 API
 */
class NotebookService {
  /**
   * 获取笔记本列表
   */
  fetchList () {
    return xhr({
      url: '/notebook/fetchList'
    })
  }

}

// 实例化后导出，全局单例
export default new NotebookService()
