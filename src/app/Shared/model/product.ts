export interface Iproduct {
    pid: string;
    pname: string;
    pprice: number;
    pstatus: string;
    canReturn: number;
    pdescription: string;
    pimage: string;
}

export interface Ires<T> {
    msg : string,
    data : T
}