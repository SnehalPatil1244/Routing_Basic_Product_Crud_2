import { Injectable } from '@angular/core';
import { Iproduct, Ires } from '../model/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsArr : Array<Iproduct> = [
    {
      pid: 'P101',
      pname: 'Samsung M31',
      pprice: 14999,
      pstatus: 'In-Progress',
      canReturn: 1,
      pdescription: '6GB RAM, 128GB Storage, 6000mAh Battery',
      pimage: 'https://mxp-media.ilnmedia.com/media/content/2020/Mar/samsung-galaxy-m31-review-740x500-1-1583410499.jpg?w=780&h=528&cc=1'
    },
    {
      pid: 'P102',
      pname: 'Samsung TV',
      pprice: 32999,
      pstatus: 'Dispatched',
      canReturn: 1,
      pdescription: '43-inch Full HD Smart TV with HDR',
      pimage: 'https://dpmartcloud.s3.ap-south-1.amazonaws.com/images/66f9169f9b338.webp?p=full'
    },
    {
      pid: 'P103',
      pname: 'iPhone 15',
      pprice: 79999,
      pstatus: 'Delivered',
      canReturn: 0,
      pdescription: 'A16 Bionic Chip, 128GB Storage',
      pimage: 'https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-2__en-IN.jpg?v=1759733974&width=1445'
    },
    {
      pid: 'P104',
      pname: 'OnePlus 12',
      pprice: 64999,
      pstatus: 'Delivered',
      canReturn: 1,
      pdescription: 'Snapdragon 8 Gen 3, 12GB RAM',
      pimage: 'https://oasis.opstatics.com/content/dam/oasis/page/2023/cn/12/12-black.png'
    },
    {
      pid: 'P105',
      pname: 'Dell Inspiron 15',
      pprice: 55999,
      pstatus: 'In-Progress',
      canReturn: 1,
      pdescription: 'Intel i5 13th Gen, 16GB RAM, 512GB SSD',
      pimage: 'https://cdn.mos.cms.futurecdn.net/rQS4P2Sdeepy58zT9Fg4yT.jpg'
    },
    {
      pid: 'P106',
      pname: 'Sony Headphones',
      pprice: 8999,
      pstatus: 'Dispatched',
      canReturn: 1,
      pdescription: 'Wireless Noise Cancelling Headphones',
      pimage: 'https://shopatsc.com/cdn/shop/files/1_b36ac316-5085-4893-b60d-80b719789ca1.jpg?v=1727158985'
    }
  ];

  constructor() { }

  fetchproducts() : Observable<Iproduct[]>{
    return of(this.productsArr)
  }

  fetchproductById(id : string) : Observable<Iproduct>{
    let productobj = this.productsArr.find(p => p.pid === id)!
    return of(productobj)
  }

  createproduct(product : Iproduct) : Observable<Ires<Iproduct>>{
    this.productsArr.push(product)
    return of({
      msg : `The Product With Id ${product.pid} Is Added  Successfully !! `,
      data : product
    })
  }

  onproductupdate(updatedobj : Iproduct) : Observable <Ires<Iproduct>>{
    let findindex =this.productsArr.findIndex(p => p.pid === updatedobj.pid)
    this.productsArr[findindex] = updatedobj
    return of({
      msg : `The Product With Id ${updatedobj.pid} Is Udated Successfully !!`,
      data : updatedobj
    })
  }

  onRemoveproduct(id : string) : Observable<Ires<Iproduct>>{
    let getindex = this.productsArr.findIndex(p => p.pid === id)
     let remove = this.productsArr.splice(getindex,1)
    return of({
      msg : `The Product Is Removed Successfully !!`,
      data : remove[0]
    })

  }
}
