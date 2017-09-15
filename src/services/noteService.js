import xhr from './xhr/'
/**
 * 留言板所用到的 API
 */
class NotebookService {
  /**
   * 获取笔记列表
   */
  fetchList () {
    return xhr({
      url: '/note/notesList'
    })
  }

  /**
  * 新建笔记
  * @param   {String} data.noteTitle
  * @param   {String} data.noteContent
  */
  newNotebook (data) {
    return xhr({
      url: '/note/newNote',
      method: 'post',
      body: data
    })
  }

}

// 实例化后导出，全局单例
export default new NotebookService()
