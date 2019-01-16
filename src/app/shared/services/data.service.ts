import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Product} from '../models/product';
import {map, retry} from 'rxjs/operators';
import {RawDataSet} from '../models/interfaces';

const API_ENDPOINT = 'https://6shgntz9ka.execute-api.us-west-2.amazonaws.com/test/products';

const FAKE = {
  'products': [{
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-235-009-V01.jpg',
    'name': 'Microloft Area ',
    'price': '$1033.99',
    'rating': 5,
    'review_count': 2083,
    'description': 'Ut velit quisquam ut. Ipsum magnam ut sed amet. Neque voluptatem porro numquam ipsum sed voluptatem. Modi tempora ut quiquia voluptatem ut dolor. Magnam dolorem sit quaerat. Est etincidunt aliquam sit neque. Sed voluptatem eius dolorem. Quisquam amet neque neque porro. Tempora etincidunt ut sit dolor est dolore sit. Non sed dolor aliquam adipisci.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/0N6-00ZF-001B7-Z01.jpg',
    'name': 'Microloft Doorways Light',
    'price': '$1303.99',
    'rating': 4,
    'review_count': 2965,
    'description': 'Eius quisquam velit ut. Sit neque voluptatem porro numquam. Magnam eius numquam dolor aliquam quisquam amet. Dolore magnam aliquam numquam. Modi eius dolorem ut.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/1TS-000X-00UY5-V01.jpg',
    'name': 'Samsong Message ',
    'price': '$2303.99',
    'rating': 4,
    'review_count': 1442,
    'description': 'Amet dolor quiquia consectetur. Adipisci dolor quisquam ipsum voluptatem dolorem. Modi magnam quaerat quisquam quisquam. Quiquia labore dolor eius est. Est voluptatem ut neque quiquia etincidunt dolorem. Modi eius eius velit adipisci adipisci. Tempora ipsum dolor consectetur magnam sed quaerat. Modi amet aliquam eius dolore porro tempora quaerat. Tempora labore numquam dolorem quisquam quiquia quisquam velit. Velit ipsum dolore dolore.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/2BN-000G-000F0-Z01.jpg',
    'name': 'MiBware Workstation Business',
    'price': '$2492.99',
    'rating': 5,
    'review_count': 1454,
    'description': 'Ut adipisci modi est. Non non ut ipsum modi consectetur. Ipsum dolor ipsum modi sed. Dolorem quisquam modi adipisci etincidunt adipisci etincidunt magnam. Consectetur neque eius aliquam magnam consectetur quiquia tempora. Quaerat non magnam neque sed ipsum. Numquam neque etincidunt neque porro dolor sed.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-155-028-V25.jpg',
    'name': 'Lenobo Toga ',
    'price': '$1440.99',
    'rating': 5,
    'review_count': 1537,
    'description': 'Etincidunt non est amet non. Ut labore eius dolorem ut. Voluptatem labore ut neque numquam. Consectetur dolor aliquam dolor est modi. Sed adipisci non etincidunt eius. Dolor ipsum modi velit.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-155-030-V21.jpg',
    'name': 'Lenobo Toga Pro',
    'price': '$1017.99',
    'rating': 2,
    'review_count': 2414,
    'description': 'Neque magnam modi ut sit quaerat. Amet sit porro ut etincidunt dolore ut. Quaerat amet dolore dolor. Sed sit voluptatem sit. Consectetur sit est eius est. Ipsum magnam adipisci labore aliquam quaerat quaerat modi. Sed amet voluptatem dolorem eius sed amet. Voluptatem modi dolore adipisci porro dolore.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-234-025-Z01.jpg',
    'name': 'Microloft Doorways Pro',
    'price': '$1203.99',
    'rating': 4,
    'review_count': 2368,
    'description': 'Porro etincidunt dolore dolore. Amet consectetur dolorem etincidunt dolor. Consectetur sit adipisci sit quaerat porro. Sed ut dolore dolore. Consectetur quiquia dolore magnam sed. Consectetur magnam ipsum etincidunt. Voluptatem labore modi consectetur porro. Amet magnam quaerat dolore quiquia. Quaerat labore quiquia tempora labore.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-234-873-V01.jpg',
    'name': 'Mapple Megabook Pro',
    'price': '$1407.99',
    'rating': 4,
    'review_count': 1599,
    'description': 'Magnam dolore voluptatem numquam numquam. Est eius quiquia sit etincidunt neque est est. Amet dolor tempora quiquia eius. Quisquam velit tempora adipisci dolor quaerat sed. Aliquam porro quaerat modi modi quiquia. Modi est ut etincidunt sed est dolor etincidunt. Labore non dolore porro modi dolor ut. Sed adipisci non porro consectetur numquam. Eius ipsum sit aliquam voluptatem. Porro dolorem voluptatem quisquam aliquam dolore non porro.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-234-894-V09.jpg',
    'name': 'Doby Taio Business',
    'price': '$2441.99',
    'rating': 3,
    'review_count': 1765,
    'description': 'Ut sed sed adipisci modi. Aliquam quaerat dolore ipsum. Aliquam voluptatem quisquam etincidunt sit velit consectetur labore. Dolore ipsum quisquam eius. Non magnam adipisci neque neque. Magnam modi dolorem tempora neque tempora. Labore sed quaerat tempora. Numquam dolorem aliquam dolor est dolorem etincidunt.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-234-929-V01.jpg',
    'name': 'Doby PLP Gold Edition',
    'price': '$1628.99',
    'rating': 1,
    'review_count': 646,
    'description': 'Ipsum voluptatem neque quaerat aliquam numquam. Consectetur porro sed dolor velit consectetur. Dolor numquam dolorem etincidunt sit. Numquam aliquam ipsum est neque dolore ut. Porro non porro sed dolor. Quaerat labore quiquia porro voluptatem tempora amet dolore. Sit porro dolor dolore. Porro non dolor dolor.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-234-967-V16.jpg',
    'name': 'MiBware Borealis 2',
    'price': '$1105.99',
    'rating': 2,
    'review_count': 1850,
    'description': 'Velit dolorem sit quiquia quaerat quaerat amet. Sit voluptatem tempora quisquam etincidunt labore dolorem est. Ipsum labore tempora dolore neque tempora eius est. Modi voluptatem eius modi sit. Neque dolor adipisci magnam consectetur aliquam quisquam modi. Quiquia ipsum porro neque. Velit quisquam porro eius tempora sit modi amet.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-234-970-V16.jpg',
    'name': 'Microloft Area Pro',
    'price': '$2098.99',
    'rating': 3,
    'review_count': 898,
    'description': 'Aliquam magnam consectetur consectetur dolor etincidunt quaerat voluptatem. Neque porro dolor sed voluptatem. Porro tempora est non. Ipsum porro eius ut eius aliquam etincidunt. Tempora est labore etincidunt labore non consectetur est. Dolor porro aliquam voluptatem ipsum magnam.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-234-982-V01.jpg',
    'name': 'Microloft Area Business',
    'price': '$2408.99',
    'rating': 2,
    'review_count': 745,
    'description': 'Sed consectetur est magnam consectetur dolore quisquam. Quiquia sit ut quaerat. Ipsum sed ut sit quisquam dolore. Quiquia modi sit ut. Consectetur consectetur velit quiquia dolor neque neque numquam. Porro sit numquam labore dolore etincidunt sit. Quaerat dolore porro ipsum labore aliquam. Sed dolorem aliquam aliquam. Voluptatem aliquam ut quiquia. Quaerat quiquia quisquam dolor labore aliquam.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-234-993-V21.jpg',
    'name': 'Samsong Message Gold Edition',
    'price': '$1468.99',
    'rating': 4,
    'review_count': 1123,
    'description': 'Etincidunt non tempora adipisci. Tempora aliquam numquam numquam. Amet tempora tempora aliquam magnam neque quaerat voluptatem. Adipisci numquam consectetur dolorem eius quisquam. Sed adipisci dolore aliquam consectetur porro dolor. Amet ipsum aliquam amet etincidunt porro sed. Aliquam modi dolor etincidunt neque etincidunt. Etincidunt aliquam tempora quisquam est.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-234-998-V01.jpg',
    'name': 'MiBware Workstation Pro',
    'price': '$1115.99',
    'rating': 2,
    'review_count': 1214,
    'description': 'Velit consectetur magnam velit. Modi quaerat magnam sed ipsum dolore. Quaerat numquam modi adipisci modi adipisci etincidunt quisquam. Quiquia labore quaerat quaerat. Etincidunt eius ut ipsum quaerat tempora sit ipsum. Consectetur aliquam dolor magnam aliquam. Adipisci voluptatem velit velit ipsum aliquam sed.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-235-015-V01.jpg',
    'name': 'Samsong Universe Gold Edition',
    'price': '$1369.99',
    'rating': 3,
    'review_count': 3060,
    'description': 'Ipsum est sed labore non tempora non dolorem. Ut sed ipsum consectetur. Tempora non labore ut. Sit ut quaerat voluptatem eius ut. Quisquam sed dolore sed eius ipsum.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-235-073-V14.jpg',
    'name': 'Doby PLP Pro',
    'price': '$1558.99',
    'rating': 2,
    'review_count': 975,
    'description': 'Etincidunt quiquia labore etincidunt labore. Velit sed eius ut. Neque amet modi voluptatem. Aliquam adipisci sit voluptatem porro dolorem sed numquam. Porro ipsum dolor quaerat tempora. Dolor dolorem porro est. Adipisci etincidunt dolor quisquam eius. Neque neque sit adipisci modi consectetur porro non. Labore dolore sit sed labore quaerat numquam modi. Etincidunt dolor sed numquam adipisci sit dolorem velit.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-235-074-S01.jpg',
    'name': 'Mapple Megapad Business',
    'price': '$2440.99',
    'rating': 4,
    'review_count': 1904,
    'description': 'Neque labore est tempora. Dolore dolore ipsum eius aliquam non eius. Quaerat numquam labore quisquam porro dolorem. Sit sed dolor adipisci amet. Dolor numquam dolor dolorem consectetur amet. Neque voluptatem quisquam adipisci. Amet sit sed eius numquam non non. Magnam velit quisquam magnam dolore.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-235-079-Z01.jpg',
    'name': 'Microloft Area Light',
    'price': '$1655.99',
    'rating': 5,
    'review_count': 3276,
    'description': 'Etincidunt sed tempora adipisci voluptatem eius. Voluptatem est sit quisquam. Modi est sed amet neque amet porro. Sed velit aliquam dolor quiquia. Consectetur amet aliquam aliquam etincidunt consectetur adipisci. Velit modi sed dolorem. Ut dolor est non numquam quaerat non. Etincidunt est ut tempora dolorem neque adipisci porro. Eius non adipisci ipsum. Porro sit labore dolor dolore amet.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-268-175-V01.jpg',
    'name': 'Doby Taio Light',
    'price': '$883.99',
    'rating': 3,
    'review_count': 2845,
    'description': 'Porro consectetur aliquam dolore velit velit aliquam. Non velit voluptatem dolor quiquia. Magnam porro porro aliquam non tempora porro. Porro consectetur dolore numquam voluptatem ipsum. Consectetur non amet labore voluptatem ut est quisquam. Dolor dolorem consectetur modi numquam quaerat dolor. Consectetur tempora quisquam sed amet eius aliquam modi. Velit tempora sed aliquam adipisci aliquam neque. Aliquam quisquam dolor velit. Porro dolore magnam quaerat.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-269-060-V01.jpg',
    'name': 'Doby PLP 2',
    'price': '$1125.99',
    'rating': 3,
    'review_count': 1991,
    'description': 'Neque dolor tempora magnam quisquam eius. Modi ipsum quiquia porro aliquam etincidunt adipisci porro. Ipsum neque est magnam non dolore dolorem. Dolor labore sit porro numquam aliquam neque modi. Eius eius labore labore. Sed dolorem amet dolore non neque voluptatem. Est consectetur sit non sed sed quiquia.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-269-142-Z01.jpg',
    'name': 'Mapple Megabook Gold Edition',
    'price': '$1200.99',
    'rating': 5,
    'review_count': 2938,
    'description': 'Adipisci dolore dolorem quiquia adipisci. Magnam aliquam dolorem numquam labore voluptatem non. Quisquam numquam consectetur labore. Numquam amet dolore est quaerat. Dolore sit dolore non etincidunt. Eius dolorem non voluptatem. Quaerat consectetur voluptatem aliquam eius. Dolorem tempora est consectetur sed velit.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-316-367-V01.jpg',
    'name': 'Samsong Message 2',
    'price': '$1905.99',
    'rating': 3,
    'review_count': 3345,
    'description': 'Quisquam adipisci sit ipsum. Numquam ut modi non amet dolorem voluptatem. Quiquia ut neque labore dolore porro dolore dolorem. Numquam aliquam velit quiquia etincidunt quaerat ut est. Velit modi porro quisquam. Numquam porro dolorem non ut est.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-316-540-V01.jpg',
    'name': 'Doby PLP ',
    'price': '$1461.99',
    'rating': 4,
    'review_count': 3142,
    'description': 'Tempora dolorem tempora dolorem quisquam. Ipsum non etincidunt est. Sed magnam numquam etincidunt. Porro tempora dolor adipisci quaerat. Quaerat neque labore neque dolore consectetur modi sed. Ipsum non voluptatem aliquam sit sit. Tempora numquam ut quisquam velit modi consectetur neque. Voluptatem quaerat voluptatem consectetur eius quaerat tempora. Adipisci ut adipisci etincidunt amet modi. Ipsum quisquam sed voluptatem.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-324-031-V07.jpg',
    'name': 'Samsong Message Business',
    'price': '$960.99',
    'rating': 4,
    'review_count': 2253,
    'description': 'Dolor velit etincidunt est porro magnam consectetur. Voluptatem etincidunt adipisci modi voluptatem ut voluptatem. Tempora neque sed quiquia etincidunt ipsum velit. Magnam neque quiquia sed aliquam ipsum quisquam adipisci. Quiquia sed quisquam labore magnam consectetur quisquam est. Labore aliquam quiquia tempora. Dolor ut numquam labore dolore magnam. Ut magnam neque sed magnam sit numquam. Ut est dolor ut consectetur eius consectetur velit. Porro sed ipsum quaerat tempora.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-324-036-V07.jpg',
    'name': 'Microloft Doorways Gold Edition',
    'price': '$1420.99',
    'rating': 4,
    'review_count': 1803,
    'description': 'Consectetur quiquia dolorem est dolorem quaerat numquam. Dolor adipisci non non labore dolor dolore ut. Sed etincidunt quaerat numquam non numquam. Etincidunt quisquam quiquia numquam. Amet consectetur dolorem quisquam non ipsum labore. Neque dolore dolor velit quisquam. Eius dolorem numquam dolore sed consectetur neque dolore.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-332-358-Z01.jpg',
    'name': 'Lenobo Silverbook ',
    'price': '$1931.99',
    'rating': 1,
    'review_count': 1199,
    'description': 'Neque aliquam magnam non voluptatem sed. Quiquia dolor consectetur neque ut. Ipsum modi quiquia sed. Quiquia quiquia porro sit. Quisquam dolorem quisquam amet eius tempora. Sit neque voluptatem consectetur. Sit consectetur etincidunt modi magnam sit sed. Dolorem eius amet magnam.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-735-405-V01.jpg',
    'name': 'MiBware Workstation Gold Edition',
    'price': '$1339.99',
    'rating': 1,
    'review_count': 2500,
    'description': 'Quiquia porro voluptatem dolorem est velit sed quisquam. Aliquam sed adipisci numquam aliquam modi aliquam. Voluptatem non etincidunt voluptatem adipisci labore sed neque. Velit non aliquam quaerat labore quaerat. Dolore amet labore quisquam porro non. Etincidunt adipisci neque tempora neque ipsum amet porro. Neque numquam tempora velit aliquam dolorem. Quisquam dolor porro eius labore dolore magnam. Numquam amet quaerat neque quaerat.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-847-209-V13.jpg',
    'name': 'Microloft Doorways 2',
    'price': '$1313.99',
    'rating': 3,
    'review_count': 2879,
    'description': 'Dolorem neque quaerat quisquam eius. Ipsum sed aliquam aliquam eius. Aliquam numquam dolor sed modi porro quisquam. Etincidunt quaerat consectetur voluptatem est sit. Magnam aliquam ut voluptatem sed ut ipsum. Eius dolore amet consectetur ut numquam. Magnam sed modi amet quisquam quisquam quisquam. Voluptatem ut ipsum est voluptatem labore velit non.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-847-227-V01.jpg',
    'name': 'Microloft Doorways ',
    'price': '$2059.99',
    'rating': 1,
    'review_count': 2017,
    'description': 'Porro magnam sed ipsum magnam sit dolorem quisquam. Ut ut eius tempora dolor. Magnam consectetur etincidunt magnam. Ipsum tempora dolore eius porro tempora modi. Magnam dolor sit numquam. Neque amet quiquia adipisci quiquia dolor. Adipisci tempora amet labore sed. Etincidunt aliquam ipsum labore non sed.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-847-256-V15.jpg',
    'name': 'Mapple Megabook Light',
    'price': '$1974.99',
    'rating': 2,
    'review_count': 3060,
    'description': 'Ut dolor numquam ut amet numquam labore velit. Porro quiquia voluptatem quisquam velit ut sit magnam. Ipsum sed voluptatem numquam labore. Voluptatem modi eius ipsum labore porro labore quisquam. Dolorem ipsum quiquia quiquia sed. Ut quiquia ut labore. Eius adipisci sit amet adipisci neque aliquam est. Sed dolorem ut modi quisquam tempora neque aliquam. Ipsum magnam dolorem ipsum.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-850-629-V01.jpg',
    'name': 'MiBware Borealis Business',
    'price': '$1894.99',
    'rating': 5,
    'review_count': 1126,
    'description': 'Modi voluptatem quaerat non eius. Magnam labore labore numquam sit quiquia dolor. Ipsum est quiquia eius porro. Dolore dolore amet voluptatem tempora. Sed modi ipsum dolore consectetur porro. Voluptatem eius ipsum tempora velit dolore sed. Dolore tempora tempora modi adipisci magnam. Neque quaerat quisquam consectetur quiquia. Tempora est sed sed amet. Voluptatem adipisci neque voluptatem numquam labore.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-850-640-V18.jpg',
    'name': 'Samsong Universe 2',
    'price': '$1595.99',
    'rating': 3,
    'review_count': 3484,
    'description': 'Consectetur dolore neque quisquam dolorem tempora dolorem porro. Quiquia modi etincidunt ut. Numquam velit dolor dolor dolorem dolorem. Porro amet aliquam adipisci sit porro ipsum neque. Etincidunt etincidunt aliquam modi dolorem. Dolore ut dolorem dolor. Labore quaerat eius consectetur non sed dolore.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-850-642-V01.jpg',
    'name': 'Mapple Megapad Pro',
    'price': '$1037.99',
    'rating': 2,
    'review_count': 2814,
    'description': 'Quiquia porro velit magnam dolorem est. Adipisci numquam etincidunt numquam amet velit. Aliquam dolorem aliquam consectetur. Labore modi est porro. Sed neque adipisci eius quisquam quisquam. Numquam quiquia consectetur quiquia. Labore ut consectetur quiquia. Eius neque amet ipsum. Labore modi modi etincidunt. Dolore eius etincidunt numquam modi ipsum quaerat.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-850-643-V01.jpg',
    'name': 'Lenobo Silverbook Light',
    'price': '$852.99',
    'rating': 3,
    'review_count': 1094,
    'description': 'Quisquam labore quiquia modi consectetur velit consectetur. Neque voluptatem eius dolor quaerat. Modi quisquam magnam porro sed porro. Labore porro sed est velit. Dolorem quaerat voluptatem dolorem.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-850-645-V16.jpg',
    'name': 'Doby Taio Gold Edition',
    'price': '$2080.99',
    'rating': 3,
    'review_count': 657,
    'description': 'Velit quisquam dolore tempora ipsum. Consectetur sed eius dolor sed dolore velit. Quisquam est numquam ipsum amet. Numquam sit porro ipsum dolorem modi. Dolorem dolore ut quisquam tempora. Amet etincidunt dolor sed. Consectetur velit quiquia consectetur dolor. Quaerat quisquam etincidunt modi amet.'
  }, {
    'image': 'https://s3-us-west-2.amazonaws.com/rsctest/Images/34-850-877-V14.jpg',
    'name': 'Mapple Megabook ',
    'price': '$1381.99',
    'rating': 3,
    'review_count': 2387,
    'description': 'Magnam porro dolor numquam aliquam amet. Neque tempora sed est modi. Dolor tempora eius etincidunt quaerat labore. Tempora voluptatem dolor dolorem ipsum ut. Dolorem magnam dolore velit. Voluptatem sit ut quisquam porro est labore quiquia. Etincidunt voluptatem neque etincidunt consectetur labore. Neque labore non tempora numquam ut amet velit.'
  }]
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private  http: HttpClient) {
  }

  fetchData(): Observable<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders({'x-api-key': 'EIP3oOCbk48goGK0d2c5G8c3v6ukje4a8gWORat7'}),
      cache: true
    };
    return this.http.get<RawDataSet>(API_ENDPOINT, httpOptions).pipe(
      retry(3),
      map(res => res.products.map(rawData => new Product(rawData)))
    );
  }

  fetchFakeData(): Observable<Product []> {
    return of(FAKE).pipe(
      retry(3),
      map(res => res.products.map(rawData => new Product(rawData)))
    );
  }

}


