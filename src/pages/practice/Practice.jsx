import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import styles from './Practice.module.scss';
import clsx from 'clsx';

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaMarker,
  FaRegCheckCircle,
  FaRegClock,
  FaRegQuestionCircle,
  FaSignOutAlt,
  FaStar,
  FaTimesCircle,
  FaUndoAlt,
} from "react-icons/fa";
import {
  Breadcrumb,
  Col,
  Drawer,
  Modal,
  notification,
  Progress,
  Radio,
  Row,
  Space,
  Statistic
} from "antd";
import moment from "moment";
const questions = [
  {
    "id": "63e4bc7ef5f0bc4cce7ed7c6",
    "question": "<p>Số cần điền v&agrave;o: ... &ndash; 2 = 1 l&agrave;:</p>",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "6",
        "isResult": false,
        "_id": "63e4bc7ef5f0bc4cce7ed7c7"
      },
      {
        "index": 1,
        "text": "5",
        "isResult": false,
        "_id": "63e4bc7ef5f0bc4cce7ed7c8"
      },
      {
        "index": 2,
        "text": "3",
        "isResult": true,
        "_id": "63e4bc7ef5f0bc4cce7ed7c9"
      },
      {
        "index": 3,
        "text": "4",
        "isResult": false,
        "_id": "63e4bc7ef5f0bc4cce7ed7ca"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 2,
    "hint": "<p>v&igrave; 1+2 = 3</p>",
    "createDate": 1675934846011,
    "updateDate": 1678014793240
  },
  {
    "id": "63e4bd47f5f0bc4cce7ed7d6",
    "question": "8 + 2 ... 9 – 2 Dấu cần điền là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": ">",
        "isResult": true,
        "_id": "63e4bd47f5f0bc4cce7ed7d7"
      },
      {
        "index": 1,
        "text": "<",
        "isResult": false,
        "_id": "63e4bd47f5f0bc4cce7ed7d8"
      },
      {
        "index": 2,
        "text": "=",
        "isResult": false,
        "_id": "63e4bd47f5f0bc4cce7ed7d9"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 5,
    "hint": "",
    "createDate": 1675935047759,
    "updateDate": 1675935047759
  },
  {
    "id": "63e4be26f5f0bc4cce7ed844",
    "question": "<p>Số lớn nhất c&oacute; một chữ số l&agrave;:</p>",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4be26f5f0bc4cce7ed845"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4be26f5f0bc4cce7ed846"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4be26f5f0bc4cce7ed847"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4be26f5f0bc4cce7ed848"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 6,
    "hint": "<p>v&igrave; 9 lớn hơn tất cả c&aacute;c số c&oacute; 1 chữ c&ograve;n lại.</p>",
    "createDate": 1675935270076,
    "updateDate": 1678014607282
  },
  {
    "id": "63e4c0a5f5f0bc4cce7edaa5",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0a5f5f0bc4cce7edaa6"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0a5f5f0bc4cce7edaa7"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0a5f5f0bc4cce7edaa8"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0a5f5f0bc4cce7edaa9"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 7,
    "hint": "",
    "createDate": 1675935909582,
    "updateDate": 1675935909582
  },
  {
    "id": "63e4c0a7f5f0bc4cce7edaab",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0a7f5f0bc4cce7edaac"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0a7f5f0bc4cce7edaad"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0a7f5f0bc4cce7edaae"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0a7f5f0bc4cce7edaaf"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 8,
    "hint": "",
    "createDate": 1675935911826,
    "updateDate": 1675935911826
  },
  {
    "id": "63e4c0aaf5f0bc4cce7edab1",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0aaf5f0bc4cce7edab2"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0aaf5f0bc4cce7edab3"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0aaf5f0bc4cce7edab4"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0aaf5f0bc4cce7edab5"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 9,
    "hint": "",
    "createDate": 1675935914400,
    "updateDate": 1675935914400
  },
  {
    "id": "63e4c0acf5f0bc4cce7edab7",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0acf5f0bc4cce7edab8"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0acf5f0bc4cce7edab9"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0acf5f0bc4cce7edaba"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0acf5f0bc4cce7edabb"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 10,
    "hint": "",
    "createDate": 1675935916267,
    "updateDate": 1675935916267
  },
  {
    "id": "63e4c0aef5f0bc4cce7edabd",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0aef5f0bc4cce7edabe"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0aef5f0bc4cce7edabf"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0aef5f0bc4cce7edac0"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0aef5f0bc4cce7edac1"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 11,
    "hint": "",
    "createDate": 1675935918382,
    "updateDate": 1675935918382
  },
  {
    "id": "63e4c0b0f5f0bc4cce7edac3",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0b0f5f0bc4cce7edac4"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0b0f5f0bc4cce7edac5"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0b0f5f0bc4cce7edac6"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0b0f5f0bc4cce7edac7"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 12,
    "hint": "",
    "createDate": 1675935920359,
    "updateDate": 1675935920359
  },
  {
    "id": "63e4c0b2f5f0bc4cce7edac9",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0b2f5f0bc4cce7edaca"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0b2f5f0bc4cce7edacb"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0b2f5f0bc4cce7edacc"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0b2f5f0bc4cce7edacd"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 13,
    "hint": "",
    "createDate": 1675935922567,
    "updateDate": 1675935922567
  },
  {
    "id": "63e4c0b5f5f0bc4cce7edacf",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0b5f5f0bc4cce7edad0"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0b5f5f0bc4cce7edad1"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0b5f5f0bc4cce7edad2"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0b5f5f0bc4cce7edad3"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 14,
    "hint": "",
    "createDate": 1675935925062,
    "updateDate": 1675935925062
  },
  {
    "id": "63e4c0b6f5f0bc4cce7edad5",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0b6f5f0bc4cce7edad6"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0b6f5f0bc4cce7edad7"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0b6f5f0bc4cce7edad8"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0b6f5f0bc4cce7edad9"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 15,
    "hint": "",
    "createDate": 1675935926882,
    "updateDate": 1675935926882
  },
  {
    "id": "63e4c0b9f5f0bc4cce7edadb",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0b9f5f0bc4cce7edadc"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0b9f5f0bc4cce7edadd"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0b9f5f0bc4cce7edade"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0b9f5f0bc4cce7edadf"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 16,
    "hint": "",
    "createDate": 1675935929043,
    "updateDate": 1675935929043
  },
  {
    "id": "63e4c0bcf5f0bc4cce7edae1",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0bcf5f0bc4cce7edae2"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0bcf5f0bc4cce7edae3"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0bcf5f0bc4cce7edae4"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0bcf5f0bc4cce7edae5"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 17,
    "hint": "",
    "createDate": 1675935932375,
    "updateDate": 1675935932375
  },
  {
    "id": "63e4c0bdf5f0bc4cce7edae7",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0bdf5f0bc4cce7edae8"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0bdf5f0bc4cce7edae9"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0bdf5f0bc4cce7edaea"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0bdf5f0bc4cce7edaeb"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 18,
    "hint": "",
    "createDate": 1675935933938,
    "updateDate": 1675935933938
  },
  {
    "id": "63e4c0c0f5f0bc4cce7edaed",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0c0f5f0bc4cce7edaee"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0c0f5f0bc4cce7edaef"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0c0f5f0bc4cce7edaf0"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0c0f5f0bc4cce7edaf1"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 19,
    "hint": "",
    "createDate": 1675935936566,
    "updateDate": 1675935936566
  },
  {
    "id": "63e4c0c3f5f0bc4cce7edaf3",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0c3f5f0bc4cce7edaf4"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0c3f5f0bc4cce7edaf5"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0c3f5f0bc4cce7edaf6"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0c3f5f0bc4cce7edaf7"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 20,
    "hint": "<p>v&igrave; 9 lớn hơn tất cả c&aacute;c số c&oacute; 1 chữ c&ograve;n lại.</p>",
    "createDate": 1675935939049,
    "updateDate": 1675935939049
  },
  {
    "id": "63e4c0cff5f0bc4cce7edaf9",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0cff5f0bc4cce7edafa"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0cff5f0bc4cce7edafb"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0cff5f0bc4cce7edafc"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0cff5f0bc4cce7edafd"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 20,
    "hint": "",
    "createDate": 1675935951830,
    "updateDate": 1675935951830
  },
  {
    "id": "63e4c0d2f5f0bc4cce7edaff",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0d2f5f0bc4cce7edb00"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0d2f5f0bc4cce7edb01"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0d2f5f0bc4cce7edb02"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0d2f5f0bc4cce7edb03"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 21,
    "hint": "",
    "createDate": 1675935954412,
    "updateDate": 1675935954412
  },
  {
    "id": "63e4c0d5f5f0bc4cce7edb05",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0d5f5f0bc4cce7edb06"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0d5f5f0bc4cce7edb07"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0d5f5f0bc4cce7edb08"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0d5f5f0bc4cce7edb09"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 22,
    "hint": "",
    "createDate": 1675935957673,
    "updateDate": 1675935957673
  },
  {
    "id": "63e4c0d7f5f0bc4cce7edb0b",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0d7f5f0bc4cce7edb0c"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0d7f5f0bc4cce7edb0d"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0d7f5f0bc4cce7edb0e"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0d7f5f0bc4cce7edb0f"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 23,
    "hint": "",
    "createDate": 1675935959377,
    "updateDate": 1675935959377
  },
  {
    "id": "63e4c0d9f5f0bc4cce7edb11",
    "question": "Số lớn nhất có một chữ số là:",
    "result": [],
    "answer": [
      {
        "index": 0,
        "text": "8",
        "isResult": false,
        "_id": "63e4c0d9f5f0bc4cce7edb12"
      },
      {
        "index": 1,
        "text": "10",
        "isResult": false,
        "_id": "63e4c0d9f5f0bc4cce7edb13"
      },
      {
        "index": 2,
        "text": "9",
        "isResult": true,
        "_id": "63e4c0d9f5f0bc4cce7edb14"
      },
      {
        "index": 3,
        "text": "7",
        "isResult": false,
        "_id": "63e4c0d9f5f0bc4cce7edb15"
      }
    ],
    "status": 1,
    "idTopic": "63c581ec5713ed65828a373c",
    "questionChild": null,
    "parentId": null,
    "index": 24,
    "hint": "",
    "createDate": 1675935961456,
    "updateDate": 1675935961456
  }
]
const course = {
  "id": "63ae88a2fe74a345583ff56e",
  "courseName": "Toán Học 1",
  "status": 1,
  "avatar": "http://res.cloudinary.com/dxp3jz1fc/image/upload/v1679486233/mukcavqjhmdsyuqpgljr.jpg",
  "des": "<div class=\"courseDetail_detail__topic__AX0tk\">\n<div class=\"courseDetail_detail__topic__GkP8o\">\n<h2 class=\"courseDetail_detail__topic--heading__PKybb\">Bạn sẽ học được g&igrave;?</h2>\n<ul class=\"courseDetail_detail__topic--list__6XnOy\">\n<li class=\"courseDetail_detail__topic--item__zmxXt\">Nắm chắc l&yacute; thuyết chung trong m&ocirc;n học</li>\n<li class=\"courseDetail_detail__topic--item__zmxXt\">Biết c&aacute;ch l&agrave;m c&aacute;c dạng b&agrave;i cơ bản</li>\n<li class=\"courseDetail_detail__topic--item__zmxXt\">Học được c&aacute;ch tư duy b&agrave;i tập một c&aacute;ch hiệu quả</li>\n<li class=\"courseDetail_detail__topic--item__zmxXt\">Được chia sẻ lại kinh nghiệm qua c&aacute;c b&agrave;i tập</li>\n</ul>\n</div>\n<div class=\"courseDetail_detail__topic__GkP8o\">\n<h2 class=\"courseDetail_detail__topic--heading__PKybb\">Y&ecirc;u cầu</h2>\n<ul class=\"courseDetail_detail__topic--list__6XnOy\">\n<li class=\"courseDetail_detail__topic--item__zmxXt\">Nắm chắc c&aacute;c kiến thức của m&ocirc;n học ở c&aacute;c lớp dưới</li>\n<li class=\"courseDetail_detail__topic--item__zmxXt\">Sở hữu m&aacute;y t&iacute;nh hoặc thiết bị di động kết nối internet</li>\n<li class=\"courseDetail_detail__topic--item__zmxXt\">&Yacute; thức cao, tr&aacute;ch nhiệm cao trong việc tự học. Thực h&agrave;nh lại sau mỗi b&agrave;i học</li>\n<li class=\"courseDetail_detail__topic--item__zmxXt\">Khi học nếu c&oacute; kh&uacute;c mắc h&atilde;y hỏi/đ&aacute;p tại phần b&igrave;nh luận</li>\n<li class=\"courseDetail_detail__topic--item__zmxXt\">Bạn kh&ocirc;ng cần biết g&igrave; hơn nữa, kh&oacute;a học sẽ chỉ cho bạn những g&igrave; bạn cần biết</li>\n</ul>\n</div>\n</div>\n<div class=\"ddict_btn\" style=\"top: 23px; left: 589.638px;\">&nbsp;</div>\n<div class=\"ddict_btn\" style=\"top: 291.2px; left: 585.6px;\">&nbsp;</div>\n<div class=\"ddict_btn\" style=\"top: 58px; left: 676.8px;\">&nbsp;</div>",
  "shortDes": "Giúp con học giỏi Toán lớp 1 hơn một cách nhanh chóng. Video bài giảng Toán lớp 1 hiện đại có minh họa trực quan, ngắn gọn, cực kỳ dễ hiểu và thú vị. Nội dung bài luyện tập phong phú được biên soạn bám sát theo nội dung SGK Toán lớp 1 mới. Có Đề kiểm tra Toán lớp 1 hướng dẫn các em làm bài tốt hơn.",
  "slug": "toan-hoc-1",
  "idCategory": "63afdb7d3ae3dacb73148696",
  "category": {
    "id": "63afdb7d3ae3dacb73148696",
    "name": "Lớp 1",
    "status": 1,
    "avatar": "https://storage.googleapis.com/staging-ngoaingu24h/hust-cms/2023/01/03/99110882.webp",
    "des": "<p>Học online c&aacute;c m&ocirc;n To&aacute;n, L&yacute;, H&oacute;a, Sinh, Lịch sử, GDCD, Địa L&yacute;, Văn, Tiếng Anh theo chương tr&igrave;nh lớp 10 mới nhất dưới h&igrave;nh thức trắc nghiệm. C&aacute;c em c&oacute; thể học, luyện theo chương tr&igrave;nh học của bộ GDDT v&agrave; l&agrave;m c&aacute;c b&agrave;i kiểm tra học kỳ 1, học kỳ 2 ngay tr&ecirc;n website learn 4 ever .</p>",
    "index": 1,
    "slug": "lop-1",
    "createDate": 1672469373522,
    "updateDate": 1699003050550
  },
  "idTag": "63ae8fee4113e43df1d5850c",
  "createDate": 1672382626870,
  "updateDate": 1701032357653
}
const topic = {
  "id": "63c581ec5713ed65828a373c",
  "name": "Đề kiểm tra giữa học kì 1 môn Toán 1 - Đề số 1",
  "status": 1,
  "idCourse": "63ae88a2fe74a345583ff56e",
  "topicChild": [],
  "topicChildData": [],
  "parentId": "63c580ed5713ed65828a372e",
  "timePracticeInVideo": [],
  "type": 2,
  "des": "Học 10 thi 1",
  "index": 1,
  "createDate": 1673888236477,
  "updateDate": 1698917226768,
  "topicType": 3,
  "timeExam": 15,
  "numQuestion": 25,
  "video": null
}
const loading = false;

function Practice() {
  const [isReview, setIsReview] = useState(false);
  const [timeCoundown, setTimeCoundown] = useState(Date.now() + (topic?.timeExam || 0) * 1000 * 60);
  const { Countdown } = Statistic;
  const [clockStick, setClockStick] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const params = useParams();
  const handlSaveSelected = (idQuestion = string, idAnswer = string) => {
    if (selectedQuestions.find((o) => o.idQuestion === idQuestion)) {
      setSelectedQuestions([
        ...selectedQuestions.filter((c) => c.idQuestion !== idQuestion),
        {
          idQuestion,
          idAnswer,
        },
      ]);
    } else {
      setSelectedQuestions((o) => [
        ...o,
        {
          idQuestion,
          idAnswer,
        },
      ]);
    }
  };
  const handleMark = (idQuestion = string, isCheck = boolean) => {
    if (isCheck) {
      setCorrectQuestions([...correctQuestions, idQuestion]);
      setCorrect(correct + 1);
    } else if (correctQuestions.find((o) => o === idQuestion)) {
      setCorrect(correct - 1);
      setCorrectQuestions(correctQuestions.filter((o) => o !== idQuestion));
    }
  };
  return (
    <>
      <Header />
      <main>
        <div className="wide">
          <div className={clsx("practice__breadcumb")}>
            <Breadcrumb separator="›">
              <Breadcrumb.Item>
                <NavLink
                  to={"/"}
                  className={clsx("practice__breadcumb--link")}
                >
                  Trang chủ
                </NavLink>
              </Breadcrumb.Item>
              {!loading && (
                <>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}`}
                      className={clsx("detail__breadcumb--link")}
                    >
                      {course?.category?.name}
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}/${course?.slug}`}
                      className={clsx("detail__breadcumb--link")}
                    >
                      {course?.courseName}
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`}
                      className={clsx("exam__breadcumb--link")}
                    >
                      Đề kiểm tra
                    </NavLink>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <NavLink
                      to={`/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`}
                      className={clsx("practice__breadcumb--link", "active")}
                    >
                      {topic?.name}
                    </NavLink>
                  </Breadcrumb.Item>
                  <h1 className={clsx("practice__heading")}>{topic?.name}</h1>
                  <Row gutter={10} className={clsx(styles.practiceView)}>
                    <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                      <Row
                        className={
                          clockStick
                            ? clsx(styles.practiceClockPanel, "stick")
                            : clsx(styles.practiceClockPanel)
                        }
                      // onScroll={handleClockStick}
                      >
                        <FaRegClock className={clsx(styles.practiceClockIcon)} />
                        <span className={clsx(styles.practiceClockTime)}>
                          {/* {!isReview && ( */}
                          <Countdown
                            value={!isReview ? timeCoundown : 0}
                          // onFinish={handleSubmitOk}
                          // onChange={(val: StatisticProps["value"]) => {
                          //   timePratice.current = val;
                          // }}
                          />
                          {/* )} */}
                        </span>
                      </Row>
                      <div>
                        {questions.length > 0 &&
                          questions?.map((qs, i) => {
                            return (
                              <Row
                                id={qs.id}
                                className={clsx(styles.practicePractice)}
                                key={qs.id}
                              >
                                <div className={clsx(styles.practicePracticeItem)}>
                                  <div className={clsx(styles.feedbackIconWrapper)}>
                                    <FaMarker
                                      className={clsx(styles.feedbackIcon)}
                                      onClick={() => {
                                        setIsOpenModelFeedback(true);
                                        setIdQuestion(qs?.id);
                                      }}
                                    />
                                  </div>
                                  <div className={clsx(styles.gameView)}>
                                    <div className={clsx(styles.gameViewQuestion)}>
                                      <div
                                        className={clsx(styles.gameViewQuestionIndex)}
                                      >
                                        <span>{i + 1}.</span>
                                      </div>
                                      <div
                                        className={clsx(styles.gameViewQuestionText)}
                                      >
                                        <div
                                          className={clsx(styles.categorySummary)}
                                          dangerouslySetInnerHTML={{
                                            __html: qs.question ?? "",
                                          }}
                                        />
                                      </div>
                                    </div>

                                    <div className={clsx(styles.gameViewQuizChoices)}>
                                      <div className={clsx(styles.quizChoicesItem)}>
                                        <Space direction="vertical">
                                          <Radio.Group
                                            className={clsx(styles.quizChoicesItemInner)}
                                          // onChange={onChange} value={value}
                                          >
                                            {qs.answer?.map((item, i) => {
                                              return (
                                                <Radio
                                                  className={
                                                    isReview
                                                      ? statusLearn ===
                                                      TTCSconfig.STATUS_LEARNED &&
                                                      (item?.isResult
                                                        ? clsx(
                                                          styles.quizChoicesItemRadio,
                                                          "correct"
                                                        )
                                                        : selectedQuestions.find(
                                                          (o) =>
                                                            o.idAnswer.toString() ===
                                                            item?._id?.toString()
                                                        ) &&
                                                        clsx(
                                                          styles.quizChoicesItemRadio,
                                                          "inCorrect"
                                                        ))
                                                      : clsx(
                                                        styles.quizChoicesItemRadio
                                                      )
                                                  }
                                                  value={item}
                                                  key={i}
                                                  // checked={
                                                  //   !!selectedQuestions.find(
                                                  //     (o) =>
                                                  //       o.idAnswer.toString() ===
                                                  //       item?._id?.toString()
                                                  //   )
                                                  // }
                                                  onClick={(e) => {
                                                    handlSaveSelected(
                                                      qs?.id || "",
                                                      item?._id || ""
                                                    );
                                                    handleMark(
                                                      qs?.id || "",
                                                      item?.isResult
                                                    );
                                                  }}
                                                  disabled={isReview}
                                                >
                                                  <div
                                                    className={clsx(
                                                      styles.quizChoicesItemAnswer
                                                    )}
                                                  >
                                                    {answers[item.index]}.&nbsp;
                                                    <span
                                                      dangerouslySetInnerHTML={{
                                                        __html: item.text ?? "",
                                                      }}
                                                    ></span>
                                                  </div>
                                                </Radio>
                                              );
                                            })}
                                          </Radio.Group>

                                          {isReview &&
                                            {/* statusLearn ===
                                              TTCSconfig.STATUS_LEARNED && */}
                                              (
                                                <div className={clsx(styles.quizExplain)}>
                                                  {qs.hint && (
                                                    <div
                                                      className={clsx(
                                                        styles.quizExplainItem
                                                      )}
                                                    >
                                                      <p>Giải thích</p>
                                                    </div>
                                                  )}

                                                  {selectedQuestions.find(
                                                    (o) => o.idQuestion === qs.id
                                                  ) ? (
                                                    qs.answer?.find(
                                                      (item) =>
                                                        item?.isResult &&
                                                        selectedQuestions.find(
                                                          (o) =>
                                                            o.idAnswer.toString() ===
                                                            item?._id?.toString()
                                                        )
                                                    ) ? (
                                                      <p style={{ color: "#33cd99" }}>
                                                        Bạn chọn đáp án đúng
                                                      </p>
                                                    ) : (
                                                      <p style={{ color: "#ff4747" }}>
                                                        Bạn chọn đáp án sai
                                                      </p>
                                                    )
                                                  ) : (
                                                    <p style={{ color: "#ff4747" }}>
                                                      Bạn chưa chọn đáp án
                                                    </p>
                                                  )}

                                                  {qs.hint && (
                                                    <div
                                                      className={clsx(
                                                        "quiz__explain--item"
                                                      )}
                                                    >
                                                      <div
                                                        dangerouslySetInnerHTML={{
                                                          __html: qs.hint ?? "",
                                                        }}
                                                      ></div>
                                                    </div>
                                                  )}
                                                </div>
                                              )}
                                        </Space>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Row>
                            );
                          })}
                      </div>

                    </Col>

                    <Col xl={8} lg={8} md={0} sm={0} xs={0}>
                      <div className={clsx(styles.practicePalettePanel)}>
                        <div className={clsx(styles.practicePaletteMain)}>
                          <div className={clsx(styles.practicePaletteHeader)}>
                            <div className={clsx(styles.practicePaletteTitle)}>
                              Bảng câu hỏi
                            </div>
                          </div>

                          <div>
                            <div className={clsx(styles.practicePaletteProgress)}>
                              <Progress
                                // percent={
                                //   (selectedQuestions.length / totalQuestion) * 100
                                // }
                                status="active"
                                strokeColor={"#009d9d"}
                                showInfo={false}
                              />
                              <div
                                className={clsx(styles.practicePaletteProgressTsitle)}
                              >
                                {/* {selectedQuestions.length}/{totalQuestion} */}
                              </div>
                            </div>

                            <div
                              className={clsx(styles.practicePaletteQuestionList)}
                              style={
                                isReview ? { height: "30vh" } : { height: "60vh" }
                              }
                            >
                              <Row
                                style={{
                                  marginTop: "0.4rem",
                                }}
                                gutter={[0, 16]}
                              >
                                {questions?.map((o, i) =>
                                  isReview ? (
                                    <Col
                                      span={3}
                                      className={clsx(styles.questionItem)}
                                      key={i}
                                    >
                                      <a href={`#${o.id}`}>
                                        <span
                                          className={
                                            statusLearn ===
                                              TTCSconfig.STATUS_LEARNED
                                              ? o.answer?.find(
                                                (item) =>
                                                  item?.isResult &&
                                                  selectedQuestions.find(
                                                    (o) =>
                                                      o.idAnswer.toString() ===
                                                      item?._id?.toString()
                                                  )
                                              )
                                                ? clsx(
                                                  styles.questionItemBground,
                                                  "green",
                                                  "active"
                                                )
                                                : clsx(
                                                  styles.questionItemBground,
                                                  "red",
                                                  "active"
                                                )
                                              : clsx(styles.questionItemBground)
                                          }
                                        >
                                          {i + 1}
                                        </span>
                                      </a>
                                    </Col>
                                  ) : (
                                    <Col
                                      span={3}
                                      className={clsx(styles.questionItem)}
                                      key={i}
                                    >
                                      <a href={`#${o.id}`}>
                                        <span
                                          className={
                                            selectedQuestions.find(
                                              (c) => c.idQuestion === o.id
                                            )
                                              ? clsx(
                                                styles.questionItemBground,
                                                "active"
                                              )
                                              : clsx(styles.questionItemBground)
                                          }
                                        >
                                          {i + 1}
                                        </span>
                                      </a>
                                    </Col>
                                  )
                                )}
                              </Row>
                            </div>
                          </div>

                          {isReview &&
                            {/* statusLearn === TTCSconfig.STATUS_LEARNED && */ }
                              (
                                <div className={clsx(styles.practicePaletteReview)}>
                                  {userInfo?.progess?.map(
                                    (o, i) =>
                                      o.idTopic === topic?.id && (
                                        <div key={i}>
                                          <div className={clsx(styles.examPanelScore)}>
                                            <FaStar
                                              style={{
                                                color: "#ffe644",
                                                fontSize: "8rem",
                                              }}
                                            />
                                            <span>{o.score}</span>
                                          </div>
                                          <Row
                                            className={clsx(styles.examPanelBody)}
                                            gutter={[16, 16]}
                                          >
                                            <Col
                                              span={7}
                                              className={clsx(
                                                styles.examPanelBodyItem,
                                                "exam__panel--correct"
                                              )}
                                            >
                                              <FaCheckCircle
                                                style={{
                                                  color: "#33cd99",
                                                  fontSize: "1.8rem",
                                                }}
                                              />
                                              <span style={{ fontSize: "1.4rem" }}>
                                                Câu đúng
                                              </span>
                                              <span style={{ fontSize: "2.2rem" }}>
                                                {o.correctQuestion}
                                              </span>
                                            </Col>
                                            <Col
                                              span={7}
                                              className={clsx(
                                                styles.examPanelBodyItem,
                                                "exam__panel--inCorrect"
                                              )}
                                            >
                                              <FaTimesCircle
                                                style={{
                                                  color: "#ff4747",
                                                  fontSize: "1.8rem",
                                                }}
                                              />
                                              <span style={{ fontSize: "1.4rem" }}>
                                                Câu sai
                                              </span>
                                              <span style={{ fontSize: "2.2rem" }}>
                                                {/* {totalQuestion - o.correctQuestion} */}
                                              </span>
                                            </Col>
                                            <Col
                                              span={7}
                                              className={clsx(
                                                styles.examPanelBodyItem,
                                                "exam__panel--time"
                                              )}
                                            >
                                              <FaClock
                                                style={{
                                                  color: "#ffba34",
                                                  fontSize: "1.8rem",
                                                }}
                                              />
                                              <span style={{ fontSize: "1.4rem" }}>
                                                Thời gian
                                              </span>
                                              <span style={{ fontSize: "2.2rem" }}>
                                                {moment(
                                                  Math.abs(
                                                    (topic?.timeExam || 0) * 60000 -
                                                    o.timeStudy
                                                  )
                                                ).format("mm:ss")}
                                              </span>
                                            </Col>
                                          </Row>
                                        </div>
                                      )
                                  )}
                                </div>
                              )}
                          <div className={clsx(styles.practicePaletteFooter)}>
                            {isReview ? (
                              statusLearn === TTCSconfig.STATUS_LEARNED ? (
                                <div className={clsx(styles.btnGroup)}>
                                  <button
                                    className={clsx(styles.btn, styles.btnSubmit)}
                                    onClick={() => setIsOpenReviewExam(true)}
                                  >
                                    Làm lại
                                  </button>
                                  <button
                                    className={clsx(styles.btn)}
                                    onClick={() => {
                                      navigate(
                                        `/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`
                                      );
                                    }}
                                  >
                                    Thoát
                                  </button>
                                </div>
                              ) : (
                                <div className={clsx(styles.btnGroup)}>
                                  <button
                                    className={clsx(styles.btn, styles.btnSubmit)}
                                  // onClick={() => setIsOpenReviewExam(true)}
                                  >
                                    Làm tiếp
                                  </button>
                                  <button
                                    className={clsx(styles.btn)}
                                    onClick={() => {
                                      navigate(
                                        `/${course?.category?.slug}/${course?.slug}/de-kiem-tra/${params.id}`
                                      );
                                    }}
                                  >
                                    Thoát
                                  </button>
                                </div>
                              )
                            ) : (
                              <div className={clsx(styles.btnGroup)}>
                                <button
                                  className={clsx(styles.btn, styles.btnSubmit)}
                                // onClick={() => setIsOpenModelSubmit(true)}
                                >
                                  Nộp bài
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </Breadcrumb>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
export const answers = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
export default Practice