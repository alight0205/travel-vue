// 定义公共接收类型
export interface baseResponse<T> {
  // 状态码，用于判断请求是否成功
  code: number
  // 状态信息，用于提示用户
  msg: string
  // 数据，用于返回请求的数据
  data: T
}

// 定义列表接收类型
export interface listResponse<T> {
  // 列表，包含多个泛型对象
  list: T[]
  // 总记录数，用于分页显示
  total: number
}

// 定义参数传输类型
export interface paramsType {
  // 页码，选填，用于分页查询
  page_num?: number;
  // 每页显示的文章数量，选填，用于分页查询
  page_size?: number;
  [key:string]:any;
}

// 定义下拉框接收类型
export interface optionsType {
  label: string
  value: number | string
}

// 定义下拉框函数类型
export type optionsFunc = (params?: paramsType) => Promise<baseResponse<optionsType[]>>