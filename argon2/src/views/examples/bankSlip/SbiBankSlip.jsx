import React,{useState,useEffect} from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import logo from "../../../assets/img/slipimages/sbilogo.png";
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import Header from "components/Headers/Header";

const SbiBankSlip = () => {

  const [branch, setbranch] = useState("");
  const [date, setdate] = useState("");
  const [accountno, setaccountno] = useState("");
  const [firmname, setfirmname] = useState("");
  const [wordamount, setwordamount] = useState("");
  const [amount, setamount] = useState("");
  const[date1, setdate1]=useState('')

  // Quantity variable declare amount
  const [qtyamount2k, setqtyamount2k] = useState("");
  const [qtyamount500, setqtyamount500] = useState("");
  const [qtyamount200, setqtyamount200] = useState("");
  const [qtyamount100, setqtyamount100] = useState("");
  const [qtyamount50, setqtyamount50] = useState("");
  const [qtyamount20, setqtyamount20] = useState("");
  const [qtyamount10, setqtyamount10] = useState("");
  const [qtyamountcoins, setqtyamountcoins] = useState("");

  // Amount for note wise variable declare
  const [amount2k, setamount2k] = useState("");
  const [amount500, setamount500] = useState("");
  const [amount200, setamount200] = useState("");
  const [amount100, setamount100] = useState("");
  const [amount50, setamount50] = useState("");
  const [amount20, setamount20] = useState("");
  const [amount10, setamount10] = useState("");
  
  const [amountcoins, setamountcoins] = useState("");
  const token = localStorage.getItem("token");



  


  var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  function inWords(amount) {
      if ((amount = amount.toString()).length > 9) return 'overflow';
      n = ('000000000' + amount).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return;
      var str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
      return str;
  }

  const wamount = inWords(amount)
  
  const getinwordamo = ()=> {
    setwordamount(wamount);
  console.log(wordamount);
  }

  const getData = async () => {
    let result = await fetch("http://localhost:8000/getfirmslip", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    result = await result.json();
    console.log(result);
    console.log(result[0].twenty[0].amount)
    setamount20(result[0].twenty[0].amount)
    
    setTimeout(() => {
    console.log(amount20)
    }, 3000);
  
    setaccountno(result[0].account)
    console.log(accountno);
    setbranch(result[0].branch)
    setfirmname(result[0].firmname)
    setdate1(result[0].depositdate)
    setamount(result[0].totalamount)
    setqtyamount2k(result[0].twothousand[0].quantity)
    setamount2k(result[0].twothousand[0].amount)
    setqtyamount500(result[0].fivehundered[0].quantity)
    setamount500(result[0].fivehundered[0].amount)
    setqtyamount200(result[0].twohundered[0].quantity)
    setamount200(result[0].twohundered[0].amount)
    setqtyamount100(result[0].onehundered[0].quantity)
    setamount100(result[0].onehundered[0].amount)
    setqtyamount50(result[0].fifty[0].quantity)
    setamount50(result[0].fifty[0].amount)
    setqtyamount20(result[0].twenty[0].quantity)
    
    setqtyamount10(result[0].ten[0].quantity)
    setamount10(result[0].ten[0].amount)
    setamountcoins(result[0].coins)
    console.log('accountno')
    setdate(new Date(date1).toISOString().split('T')[0].replace(/-/g, '/'))
    
    console.log('amount20')
   
  //  console.log(bankarray);
  //    setBankData(bankarray);
  //    console.log(bankdata);
  };
  
  var account = accountno;
  account =  account.toString();
  console.log("first",account)
  var accountArr = [];
  var n = account.length;
  for (var i = 0; i < n; i++) {
    accountArr.push(account[i]);
  }
  console.log(accountArr);
 
  useEffect(() => {
    getData()
    getinwordamo()
    
    
    
  }, [wordamount,accountno,branch,firmname,date1,
    date,amount,amount2k,qtyamount2k,amount500,
  qtyamount500,amount200, qtyamount200,amount100,qtyamount100,amount50,
qtyamount50,amount20,qtyamount20,amount10,qtyamount10,amountcoins])
  

  const onButtonClick = () => {
    let domElement = document.getElementById('my-node');
    htmlToImage.toPng(domElement)
      .then(function (dataUrl) {
        console.log(dataUrl);
        const pdf = new jsPDF("p",'pt','a4',false);
        pdf.addImage(dataUrl, 'PNG', 0, 0,600,0,undefined,false);
        pdf.save("download.pdf");
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };

  return (
    <>
    <Header/>
    <div className="" id="my-node">
      <Row className="m-2" >
        {/* First Part of slip */}
        <Col sm={4}>
          <Card className="sbicard">
            <Card.Body className="scardbody">
              <Card.Title className="cardtitle mb-2">
                <Row>
                  <Col sm={3}>
                    <img src={logo} className="logo " alt="logo" />
                  </Col>
                  <Col>
                    <Card.Subtitle className="mb-2 cardsubtitle1">
                      State Bank of India
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 cardsubtitle2">
                      ?????????????????? ??????????????? ????????????
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 cardsubtitle3">
                      {branch},Branch ????????????
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 cardsubtitle4">
                      <Row>
                        <Col sm={4}>Date &nbsp; ??????.</Col>
                        <Col sm={6} className=" cardsubtitle4col">{date}</Col>
                      </Row>
                    </Card.Subtitle>
                  </Col>
                </Row>
              </Card.Title>

              <Card.Text>
                {/* First Row Code Start */}
                <Row className="mb-2">
                  <Col className="cardtextfrowcol1"> A/c. No.</Col>
                  {accountArr.map((item, index) => {
                    console.log(item, index);
                    return (
                      <Col className="cardtextfrowcol2 fw-bold"> {item} </Col>
                    );
                  })}
                </Row>
                {/* First Row Code End */}

                {/* Second Row Code Start */}
                <Row className="mb-2">
                  <Col sm={5} className="cardtextSrowcol1">
                    <Col>For the Credit of</Col>
                    <Col>?????? ???????????? ????????? ????????? ???????????? ???????????? </Col>{" "}
                  </Col>
                  <Col className="cardtextSrowcol2">{firmname} </Col>
                </Row>

                {/* Second Row Code End */}

                {/* Third  Row Code Start */}
                <Row className="mb-1">
                  <Col sm={7} className="cardtextSrowcol1">
                    Amount (in words) Rupees
                  </Col>
                  <Col sm={5} className="cardtextSrowcol2">
                    {" "}
                  </Col>
                  <Col sm={3} className="cardtextSrowcol1">
                    ??????.( ?????????????????? ????????? )
                  </Col>
                  <Col className="cardtextSrowcol2"> {wordamount} </Col>
                </Row>

                {/* Second Row Code End */}

                {/* Fouth Row cod Start */}
                <Table className="fourthrowtable1 " bordered >
                  <thead>
                    <tr className="theadrow">
                      <th>
                        <Col>Details of cash/cheques</Col>
                        <Col>???????????? / ??????????????? ?????? ??????????????? </Col>
                      </th>
                      <th>
                        <Col>???</Col>
                        <Col>??????.</Col>
                      </th>
                      <th>
                        <Col>P.</Col>
                        <Col>?????????.</Col>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="theadrow">
                      <td></td>
                      <td>{amount}</td>
                      <td></td>
                    </tr>
                    <tr className="theadrow">
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="theadrow">
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="theadrow">
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="theadrow">
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="theadrow">
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr className="theadrow">
                      <td className="theadrowcol text-center">
                        ????????? ??????????????? &nbsp; Total &nbsp; ???
                      </td>
                      <td className="theadrowcol">{amount}</td>
                      <td className="theadrowcol"></td>
                    </tr>
                    <tr className="theadrow">
                      <td className="theadrowcol"> Cashier ???????????????????????? </td>
                      <td colSpan={2} className="theadrowcol">
                        <Col>Cash/Passing Officer</Col>
                        <Col>???????????????/???????????????????????? ?????????????????????</Col>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                {/* Fouth Row cod End */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Second part of slip */}

        <Col sm={8}>
          <Card className="sbicard">
            <Card.Body className="scardbody">
              <Card.Title className="scardtitle">
                <Row className="scardtitlerow">
                  <Col sm={4} className="stitlecol">
                    <Row  >
                      <Col sm={3}>
                        <img src={logo} className="slogo " alt="logo" />
                      </Col>
                      <Col>
                        <Card.Subtitle className="mb-2 scardsubtitle1">
                          State Bank of India
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 scardsubtitle2">
                          ?????????????????? ??????????????? ????????????
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 scardsubtitle3">
                          {branch},Branch ????????????
                        </Card.Subtitle>
                      </Col>
                    </Row>
                  </Col>

                  <Col sm={8}>
                    <Row className="mb-2">
                        <Col sm={7} className="scardtitlecol1">CA/SB/RD/CC/DL/TL Account pay-in-slip</Col>
                        <Col>
                            
                            <Row>
                                <Col sm={4} className="scardtitlecol1" >Date ?????????????????? </Col>
                                <Col sm={8} className=" cardsubtitle4col" > {date} </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-2" >
                      <Col className="scardtitlecol1" sm={10}> ???????????? /?????????/?????????????????? ????????? ????????????/????????? ?????????????????????/???????????? ?????????/??????????????? ????????? ???????????? ????????? ??????????????? </Col>
                        
                    </Row>
                    <Row>
                        <Col className="scardtitlecol1" sm={10}>Note : Please use seperate slip for depositing Cash and cheques, Drafts etc.  </Col>
                        <Col className="scardtitlecol1" sm={10}>?????????: ??????????????? ????????? ????????? ?????????, ????????????????????? ????????? ????????? ???????????? ?????? ???????????? ????????? ??????????????? ?????? ??????????????? ????????????.  </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Title>
              <Card.Text className="scardtext">
                
                <Row>
                  <Col sm={6}>
                    <Row>
                      <Col  sm={7} className="scardtextacc">For the Credit of the account of(name)</Col>
                      <Col className=" cardsubtextcol"> {firmname} </Col>
                    </Row>
                    <Row>
                      <Col  sm={5} className="scardtextacc">?????? ???????????? ????????? ????????? ???????????? ????????????(?????????)</Col>
                      <Col className=" cardsubtextcol"> {firmname} </Col>
                    </Row>
                    <Row>
                      <Col  sm={5} className="scardtextacc">Amount (in words) Rupees</Col>
                      <Col className=" cardsubtextcol"> {wordamount} </Col>
                    </Row>
                    <Row>
                      <Col  sm={3} className="scardtextacc">??????.( ?????????????????? ????????? )</Col>
                      <Col className=" cardsubtextcol"> {wordamount} </Col>
                    </Row>
                  </Col>
                  <Col sm={6}>
                  <Row >
                    <Col className="text-center">Instalment for * ?????? ????????? ??????????????? *</Col>
                  
                </Row>
                  <Row>
                  <Col className="cardtextfrowcol1"> A/c. No.</Col>
                  {accountArr.map((item, index) => {
                    console.log(item, index);
                    return (
                      <Col className="cardtextfrowcol2 fw-bold"> {item} </Col>
                    );
                  })}
                </Row>

                <Row>
                  <Col>???????????? ?????????.</Col>
                </Row>
                  </Col>
                </Row>

                <Row className="fourthRow">
                  <Col className="fw-bold">PARTICULARS OF ???????????????</Col>
                  <Col className="fw-bold">CHEQUES ???????????????</Col>
                  <Col className="fourthrowcol3 fw-bold">CASH ????????? </Col>
                </Row>
                
                <Table className="react-bootstrap-table mt-1" bordered  >
                  <thead >
                    <tr className="theadrow" >
                      <th>
                        <Col>Drawn on bank</Col>
                        <Col>???????????????????????? ????????????  </Col>
                      </th>
                      <th>
                        <Col>Branch</Col>
                        <Col>????????????</Col>
                      </th>
                      <th>
                        <Col>Cheque No.</Col>
                        <Col>????????? ??????.</Col>
                      </th>
                      <th>
                        <Col>Casti Notes</Col>
                        <Col>???????????? ????????? </Col>
                      </th>
                      <th>
                        <Col>Amount ???????????? </Col>
                        <Col>
                        <Row>
                          <Col sm={6}>???  ??????.</Col>
                          <Col>P. ?????????.</Col>
                        </Row>
                         </Col>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="tablebody">
                    <tr className="tablerow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{qtyamount2k}X 2000</td>
                      <td >
                        {amount2k}
                      </td>
                    </tr>
                    <tr className="tablerow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{qtyamount500}X 500</td>
                      <td>{amount500}</td>
                    </tr>
                    <tr className="tablerow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{qtyamount200} X 200</td>
                      <td>{amount200}</td>
                    </tr>
                    <tr className="tablerow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td> {qtyamount100} X 100</td>
                      <td>{amount100}</td>
                    </tr>
                    <tr className="tablerow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{qtyamount50} X50</td>
                      <td>{amount50}</td>
                    </tr>
                    <tr className="tablerow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{qtyamount20} X 20</td>
                      <td>{amount20}</td>
                    </tr>
                    <tr className="tablerow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{qtyamount10} X 10 </td>
                      <td>{amount10}</td>
                    </tr>
                    <tr className="tablerow">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{qtyamountcoins} Coins ??????????????????</td>
                      <td>{amountcoins}</td>
                    </tr>
                    <tr>
                      <td>
                        <Row>
                          <Col sm={8}>
                            <Col>Cashier's Scroll No. </Col>
                            <Col>????????????????????????/??????????????? ?????????. ???????????????   </Col>
                          </Col>
                          <Col>
                            <Col>Cashier </Col>
                            <Col>???????????????????????? </Col>
                          </Col>
                          
                        </Row>
                      </td>
                      <td>
                      <Row>
                          <Col sm={8}>
                          <Col>Cash/Passing Officer</Col>
                          <Col>???????????????/???????????????????????? ?????????????????????</Col>
                          </Col>
                          <Col >
                            <Col>Jotting Book </Col>
                            <Col>???????????? ?????????  </Col>
                          </Col>
                          
                        </Row>
                      </td>
                      <td>
                      <Col>Partition No. </Col>
                      <Col>?????????????????? ?????????. </Col>
                      </td>
                      <td>
                        Total ??? ????????? ???????????????
                      </td>
                      <td>{amount}</td>
                    </tr>

                    <tr>
                      <td>Home Br/ ????????? ??????????????????</td>
                      <td>Pan No./ ????????? ?????????.</td>
                      <td> <Col>Mob./Tel. No./</Col> 
                        <Col>??????./????????????. ?????????. </Col>
                      </td>
                      <td colSpan={2}>
                        <Col>Deposited By(Signature)</Col>
                        <Col>???????????????????????? ?????? ???????????????????????????</Col>
                      </td>
                      
                    </tr>
                  </tbody>
                </Table>

              </Card.Text>
            </Card.Body>
          </Card>

        </Col>
        
      </Row>
      </div>
      <button className="sbisubmitbtn" onClick={onButtonClick}>Download PDF</button>
    </>
  );
};

export default SbiBankSlip;
