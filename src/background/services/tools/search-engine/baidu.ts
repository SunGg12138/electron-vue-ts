import axios from 'axios'
import cheerio from 'cheerio'
import * as utils from '@/background/utils'
import { SearchEngineOptions } from './types'
import { webContents } from 'electron'
import logger from '@/background/lib/logger'

const request = axios.create({
    headers: {
        'Cookie': 'BIDUPSID=3A2322FDB64AE934EA6DFCFDE40A9213; PSTM=1642784100; __yjs_duid=1_d4d992788835ee7348d287a6e6695acb1643080440480; BD_UPN=123253; MSA_WH=375_667; BDUSS=0VCeGN4QVhSSlNIWkxDeGNIbGVGaW1HSmd4R0NuMzE0YlI2bkVDamtlQWY0NWxqRVFBQUFBJCQAAAAAAAAAAAEAAAAar3h9yM~Rp7XE0afU~AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB9WcmMfVnJjb; BDUSS_BFESS=0VCeGN4QVhSSlNIWkxDeGNIbGVGaW1HSmd4R0NuMzE0YlI2bkVDamtlQWY0NWxqRVFBQUFBJCQAAAAAAAAAAAEAAAAar3h9yM~Rp7XE0afU~AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB9WcmMfVnJjb; BAIDUID=A5D658EA377AD93379DE6EC2E6A758AF:SL=0:NR=20:FG=1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; newlogin=1; BDSFRCVID=YnkOJexroG07sP6f-lKWKwWaNdNbUdrTDYrEOwXPsp3LGJLVc4f6EG0Pts1-dEub6j30ogKK0mOTHv8F_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF=tbC8VCDKJKD3H48k-4QEbbQH-UnLqMRitgOZ04n-ah02MPOMj4DVhMFqypJU5x6bBDrP0Pom3UTKsq76Wh35K5tTQP6rLttJ5Jc4KKJxbP8aKJbH5tK-M6JQhUJiB5OLBan7LDnIXKohJh7FM4tW3J0ZyxomtfQxtNRJ0DnjtpChbC8lejuaj6bLep3K2D6aKC5bL6rJabC3sn7mXU6q2bDeQN0fbh8q5tjQaRccbM3H8Rb8-lofKl0vWq54afb2tacJXfOTylR4HIbIjxonDh83KNLLKUQtKJcBoKJO5hvvhb6O3M7-eMKmDloOW-TB5bbPLUQF5l8-sq0x0bOte-bQXH_EJ5_8fRCq_KDQKt8_HRjYbb__-P4Dennq3xRZ56bHWh0MJ-OmMRLzhMkayn-i-tTbWtjP5TrnKUT-3l7boMJRK5bdQUIT3x-JKj543bRTLP8hHRbpfJ_CM6-2hP-UyN3LWh37bJblMKoaMp78jR093JO4y4Ldj4oxJpOJ5JbMopCafD8abDIlj6taePDyqx5Ka43tHD7yWCvKblQcOR59K4nnD5-y0ajhe4AjQm3f-bjk5prDSJb43MOZKxLg5n7Tbb8eBgvZ2UQJJnL-sq0x0bO5DDuOQqoattIetIOMahkMal7xO-L9QlPK5JkgMx6MqpQJQeQ-5KQN3KJmfbL9bT3YjjTyDHu8J6KftR3aQ5rtKRTffjrnhPF3WtCfXP6-hnjy3b4fQMtK5j6SOU3o5pJHX40N-Robbq3Ry6r42-39LPO2hpRjyxv4-T0Ej4oxJpOJ-bCL0p5aKDQ8hIJvbURvD-ug3-7qqU5dtjTO2bc_5KnlfMQ_bf--QfbQ0hOhqP-jBRIE3-oJqCKMMIt93H; delPer=0; BD_CK_SAM=1; BAIDUID_BFESS=A5D658EA377AD93379DE6EC2E6A758AF:SL=0:NR=20:FG=1; BDSFRCVID_BFESS=YnkOJexroG07sP6f-lKWKwWaNdNbUdrTDYrEOwXPsp3LGJLVc4f6EG0Pts1-dEub6j30ogKK0mOTHv8F_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF_BFESS=tbC8VCDKJKD3H48k-4QEbbQH-UnLqMRitgOZ04n-ah02MPOMj4DVhMFqypJU5x6bBDrP0Pom3UTKsq76Wh35K5tTQP6rLttJ5Jc4KKJxbP8aKJbH5tK-M6JQhUJiB5OLBan7LDnIXKohJh7FM4tW3J0ZyxomtfQxtNRJ0DnjtpChbC8lejuaj6bLep3K2D6aKC5bL6rJabC3sn7mXU6q2bDeQN0fbh8q5tjQaRccbM3H8Rb8-lofKl0vWq54afb2tacJXfOTylR4HIbIjxonDh83KNLLKUQtKJcBoKJO5hvvhb6O3M7-eMKmDloOW-TB5bbPLUQF5l8-sq0x0bOte-bQXH_EJ5_8fRCq_KDQKt8_HRjYbb__-P4Dennq3xRZ56bHWh0MJ-OmMRLzhMkayn-i-tTbWtjP5TrnKUT-3l7boMJRK5bdQUIT3x-JKj543bRTLP8hHRbpfJ_CM6-2hP-UyN3LWh37bJblMKoaMp78jR093JO4y4Ldj4oxJpOJ5JbMopCafD8abDIlj6taePDyqx5Ka43tHD7yWCvKblQcOR59K4nnD5-y0ajhe4AjQm3f-bjk5prDSJb43MOZKxLg5n7Tbb8eBgvZ2UQJJnL-sq0x0bO5DDuOQqoattIetIOMahkMal7xO-L9QlPK5JkgMx6MqpQJQeQ-5KQN3KJmfbL9bT3YjjTyDHu8J6KftR3aQ5rtKRTffjrnhPF3WtCfXP6-hnjy3b4fQMtK5j6SOU3o5pJHX40N-Robbq3Ry6r42-39LPO2hpRjyxv4-T0Ej4oxJpOJ-bCL0p5aKDQ8hIJvbURvD-ug3-7qqU5dtjTO2bc_5KnlfMQ_bf--QfbQ0hOhqP-jBRIE3-oJqCKMMIt93H; BA_HECTOR=2h2la40hag8505058184251k1i3c2oi1m; BD_HOME=1; ab_sr=1.0.1_NTU3OWI1YzE2ZDNmYzdjMzlmYTgyNDNlMGNkOGYxZmZmOTRiMzQzMWE4ZGNhYjJlYWRmMDc4ZWVlYjMzYzU5MzdiZWRiM2I1ZjRlOGZiOGQxZjQxMjVhZGNhOWQxY2RiYzNiYmM0ODQ2OGU1MTA0NWI5OGY4NDJkMWU2YjA5NGFiNmJlMWU1YmQ2YTM4YzdhOTA1NzkyOTE4MDlkODBjMjY4ODZkMWY4MDI1NWQzMDE0NWMxZGJkM2M5MGMzNjI5; BDPASSGATE=IlPT2AEptyoA_yiU4SOJ3lIN8eDEUsCD34OtVnti3ECGh67BmhH74KJ0E6rLWW3r2zSb-YyfmqptpjrFV6xjg0N_gRsLei-fdFaht0mhsc86OdBRudJk21XjQU1mxvLIhBFkwOEHRPxUVFoKewPJpuo4ivKe73-Qee8Fsn0FatLlDESOBVrQr7aWU7p7PGnXKtDEwh0EgSdALlieUuL2HDT4miFHN8ou5LGzi1B21ADm7EoXG4rWZMExZW85Jppg0huH4ACU61K3BEcbrZYkY8MYiVC1ytD6Mk9d_KvxfMpJM2rzJ_K_U6PhALIkiQ4yHbdlSeykhNkGDV9S98sUBph5FsTHQm8CNC6FZNOZcPzCQZY2wz7EIwDLtIMQO10H_etuSfB-TClQp7eXuBmYjTPK0eSPvLFvM0wOCpePu8gwfmVBBmjct580iWJv-p_fT7afE5XiEaP8NXtCse7_Bb4hKbXn2VEbqUuloizSjSj8F44TP16FdlQf6m5JWWiB9QePNo3XK3O_eK-gk2j3tvurzpuEqzaZwyqfRNWpTxgEQHczjLQvIlfCfYyQ5Yh_O4GdvI4n_VDDnCdOwsP-bUpkbukL1NJKOtD0JPITwcSHd7g6E-9Vo_Sz3wFfZ7nDv3llBs_gXYee4kbXWXxqoQ6PDDL7F7vzvtLgETVYEVCX_5SuENtXwk1ii9QPQf0eMUr3cuQ0Njy0gMAKDsmKjll6QQ1pJi25vXzJ3-8NCRnv7uNk6lg46ggbOIesTvfZ6Ylaixo-REWn52H0GreFoI1Oupj89dB-A0qBWnLfbUvFEv9MdGnzEFyXiSrIuQtneykk; POLYFILL=0; PSCBD=25%3A1; SE_LAUNCH=5%3A1681263698_25%3A28021061; H_WISE_SIDS=219946_219563_216838_213355_214795_219943_213028_230184_204906_230288_242158_110085_227870_236307_243706_243881_244702_244720_240590_245411_232281_249908_250738_250888_251067_251096_251127_250759_249893_252577_252824_252944_253012_251150_253044_247585_234296_253336_253066_253466_253480_253568_253704_244956_253879_250091_251786_254144_254079_229155_254322_253321_254472_179347_252646_254260_254729_250606_254683_248124_250226_254748_233836_254831_254888_250390_251133_253900_253600_253211_255294_255290_253426_255361_253693_251619_251443_255649_254077_255879_252122_255939_255933_255959; H_WISE_SIDS_BFESS=219946_219563_216838_213355_214795_219943_213028_230184_204906_230288_242158_110085_227870_236307_243706_243881_244702_244720_240590_245411_232281_249908_250738_250888_251067_251096_251127_250759_249893_252577_252824_252944_253012_251150_253044_247585_234296_253336_253066_253466_253480_253568_253704_244956_253879_250091_251786_254144_254079_229155_254322_253321_254472_179347_252646_254260_254729_250606_254683_248124_250226_254748_233836_254831_254888_250390_251133_253900_253600_253211_255294_255290_253426_255361_253693_251619_251443_255649_254077_255879_252122_255939_255933_255959; PSINO=1; Hm_lvt_9f14aaa038bbba8b12ec2a4a3e51d254=1681263319; Hm_lpvt_9f14aaa038bbba8b12ec2a4a3e51d254=1681263959; COOKIE_SESSION=86272_1_6_7_2_20_0_1_5_6_0_4_153667_0_3_0_1681264596_1680850210_1681264593%7C9%231142294_35_1680850208%7C9; H_PS_PSSID=36554_38470_38353_38368_38468_38290_37927_38356_26350_38282; baikeVisitId=e717df88-c26d-47b8-8b01-47fea61b715e; sug=3; sugstore=0; ORIGIN=2; bdime=0; H_PS_645EC=1f22q2PY0a8w53z8JxCGnVJDXet4BZlF0kFYODVk02ON8YuN%2BTouCXxIe%2Bk',
        'Host': 'www.baidu.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
    },
});

export async function spider (outputfile: typeof Outputfile, options: SearchEngineOptions) {
    const {
        keywords, totalPage, timearea
    } = options;

    webLog(`开始: 关键词-${keywords}、总页数-${totalPage}、时间范围-${timearea || '无'}`);

    const linkPart = getTimeQuery(timearea);
   
    for (let i = 1; i <= totalPage; i++) {
        const pageData = await spiderOne(keywords, i, linkPart);

        for (let item of pageData) {
            await outputfile.append([
                item.title, item.time, item.caption, item.source, item.link,
            ].join(','));
        }
        
        await utils.sleep(1000, 500);
    }

    webLog(`爬取完成`);
}

async function spiderOne(wd: string, pageNum: number = 1, linkPart: string = '') {
    webLog(`正在爬取 - 关键词: ${wd}、页码: ${pageNum}`);

    const pageData = [];
    const url = `https://www.baidu.com/s?wd=${encodeURIComponent(wd)}&pn=${(pageNum - 1) * 20}&gpc=tr%3D1&${linkPart}`;
    const res = await request.get(url);
    const $ = cheerio.load(res.data);
    const $rows = $('#content_left .result');

    for (let i = 0; i < $rows.length; i++) {
        const data: Record<string, string | undefined> = {};
        const $row = $rows.eq(i);
        
        // 视频类型的数据
        if ($row.find('h3.c-title').length <= 0 && $row.find('h3.t').length > 0) {
            data.title = $row.find('h3.t').text().trim();
            data.baiduLink = $row.find('h3.t').find('a').attr('href');
            data.source = $row.find('.c-gap-top-small').find('.c-span-last .g').text().replace(//g, '').trim();
            data.caption = $row.find('.c-gap-top-small').find('.c-span-last').text().replace(//g, '').replace(/\s/g, '').trim();
        } else {
            data.title = $row.find('h3.c-title').text().trim();
            data.baiduLink = $row.find('h3.c-title').find('a').attr('href');
            data.source = $row.find('.c-gap-top-xsmall .c-color-gray').text().trim();
            $row.find('.c-gap-top-xsmall .c-color-gray').remove();
            if ($row.find('.c-gap-top-small').length) {
                data.time = $row.find('.c-gap-top-small').find('.c-color-gray2').text().trim();
                $row.find('.c-gap-top-small').find('.c-gap-top-small').remove();
            } else if ($row.find('.c-gap-top-middle').length) {
                data.time = $row.find('.c-gap-top-middle').find('.c-color-gray2').text().trim();
                $row.find('.c-gap-top-middle').find('.c-color-gray2').remove();
            }
            data.caption = $row.find('.c-row').text().trim().replace(//g, '').replace(/\s/g, '').trim();
        }

        if (!data.baiduLink) {
            logger.error('未找到baiduLink', undefined, {
                data,
                wd,
                pageNum,
                index: i,
                url,
            });
            return Promise.reject('异常错误-请查看相关日志');
        }
        
        data.link = await getRealLink(data.baiduLink);
        pageData.push(data);
    }

    return pageData;
}

// 获取真实链接
async function getRealLink (baiduLink: string) {
    return request({
        url: baiduLink,
        maxRedirects: 0,
    }).then(function () {
        logger.error('[getRealLink] not 302', undefined, {
            baiduLink,
        });
        webLog('异常错误-请查看相关日志')
        return Promise.reject('异常错误-请查看相关日志');
    }).catch(function (error) {
        if (error.response.status !== 302) {
            logger.error('getRealLink not 302', error, {
                baiduLink,
                response: {
                    status: error.response.status,
                    data: error.response.data,
                },
            });
            webLog('异常错误-请查看相关日志')
            return Promise.reject('异常错误-请查看相关日志');
        }
        return error.response.headers.location;
    });
}

function getTimeQuery (timearea?: string): string {
    if (!timearea) return '';

    const [ start, end ] = timearea.split('~');
    const startSenond = Math.round((new Date(start).getTime()) / 1000);
    const endSenond = Math.round((new Date(end).getTime()) / 1000);
    return 'gpc=' + encodeURIComponent(`stf=${startSenond},${endSenond}|stftype=2`);
}

// 输出给前端的日志
function webLog (log: string) {
    const content = webContents.getFocusedWebContents()
    if (content) {
        content.send('tooles/search-engine/log/info', log)
    }
}
