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

  /**
  * 新建笔记本
  * @param   {String} data.notebookName
  * @param   {String} data.notebookType
  */
  newNotebook (data) {
    return xhr({
      url: '/notebook/newNotebook',
      method: 'post',
      body: data
    })
  }

}

// 实例化后导出，全局单例
export default new NotebookService()
