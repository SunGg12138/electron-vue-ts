import * as utils from '@/background/utils'
import * as baiduSearchEngine from './search-engine/baidu'
import { SearchEngineOptions } from './search-engine/types'
 
const CONST = {
    searchEngineFileType: 'search-engine'
}

export async function searchEngine(options: SearchEngineOptions): Promise<typeof DownloadOutputfile> {
    const file = utils.outputfile(CONST.searchEngineFileType)
    // 编码格式
    await file.append(Buffer.from(`\xEF\xBB\xBF`, 'binary'))
    // 添加表头
    await file.append([
        '标题', '时间', '描述', '来源', '链接'
    ].join(',') + '\n');

    await baiduSearchEngine.spider(file, options)

    return {
        outputfilePath: file.filepath,
        ext: 'csv',
    }
}
