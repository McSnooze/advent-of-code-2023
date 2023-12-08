const run = (input) => {
  const lines = input
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [hand, bid] = line.split(" ");

      const score = {};

      const parsedHand = hand.split("").map((v) => {
        score[v] = (score[v] || 0) + 1;
        switch (v) {
          case "T":
            return 10;
          case "J":
            return 0;
          case "Q":
            return 12;
          case "K":
            return 13;
          case "A":
            return 14;
          default:
            return parseInt(v);
        }
      });

      return {
        hand: parsedHand,
        bid: parseInt(bid),
        score: (() => {
          const scores = Object.values(score);
          const jCount = score["J"] || 0;

          if (scores.length === 1) return 7; // five of a kind
          if (scores.length === 2) {
            if (scores[0] === 3 || scores[1] === 3) {
              if (jCount === 2 || jCount === 3) return 7; // five of a kind
              return 5; // full house
            }
            if (jCount === 1 || jCount === 4) return 7; // five of a kind
            return 6; // four of a kind
          }
          if (scores.length === 3) {
            if (scores[0] === 3 || scores[1] === 3 || scores[2] === 3) {
              if (jCount === 1 || jCount === 3) return 6; // four of a kind
              return 4; // three of a kind
            }
            if (jCount === 2) return 6; // four of a kind
            if (jCount === 1) return 5; // full house
            return 3; // two pairs
          }
          if (scores.length === 4) {
            if (jCount === 1 || jCount === 2) return 4; // three of a kind
            return 2; // one pair
          }
          if (jCount === 1) return 2; // one pair
          return 1; // high card
        })(),
      };
    });

  const result = lines
    .sort((a, b) => {
      if (a.score > b.score) return 1;
      if (a.score < b.score) return -1;

      for (let i = 0; i < 5; i++) {
        if (a.hand[i] > b.hand[i]) return 1;
        if (a.hand[i] < b.hand[i]) return -1;
      }
      r;
      return 0;
    })
    .reduce((result, line, index) => {
      return result + line.bid * (index + 1);
    }, 0);

  console.log(result);
};

run(`
4KTJ4 575
38T4K 449
4T437 860
55954 240
Q8K89 150
85838 21
68668 464
JQT77 737
99497 155
A444A 653
AA6QQ 28
4Q39T 332
8Q579 835
58JQ5 397
KJ77A 271
88Q8T 365
AATAJ 30
3T582 325
Q8AQQ 321
KA6J4 215
KA322 403
54225 219
4ATA4 225
4222A 543
2J9KK 749
477AT 561
6J699 880
J4348 655
K4444 175
775AA 567
J8AK6 334
93A58 307
JT43J 872
A6662 929
Q74JK 779
AQAQQ 827
55557 902
6JAA6 512
676T2 763
QA3KK 181
99939 377
43T44 473
AK48A 968
44464 897
7A454 475
6JJQ8 496
5KAKK 419
77AKT 802
K4K4K 719
33739 959
325K2 534
93979 751
QK9AK 290
8J887 79
8QKQK 203
Q657Q 328
23647 869
4568K 686
49374 63
88882 578
94A9A 680
5T5T5 759
95JJ5 502
Q66QQ 771
6A886 845
74777 982
2K222 49
TQTQT 704
J7KK2 47
98A5J 187
66AA6 53
57J68 443
Q77Q7 610
63KJJ 661
6K46K 803
K6279 596
79999 85
K2J29 592
3T625 980
2Q555 236
3TTQK 687
924A2 762
6KQ2K 4
3473K 418
22QQ2 947
J69A7 915
KJJKK 617
989K5 993
333JJ 257
J27TT 626
K22KK 942
2A4A3 801
49JJK 398
328J2 50
4K5Q7 491
TT2QQ 651
KA5JQ 773
A277K 160
AAQQA 873
7775A 318
73377 847
2J898 366
88Q88 958
QQQ2Q 756
J58AA 996
387K3 190
92999 149
3Q5A9 843
63434 865
69992 643
56983 619
8T8AK 107
25Q62 148
444JJ 364
24JA6 808
J8J82 967
JKA98 347
455Q8 249
T65T8 713
763A8 500
QAT67 936
9TT99 143
39TQ3 425
2J448 831
393T9 904
79KQ6 628
8JA4Q 371
8TQ8T 829
3K2A9 277
98T77 970
96T7Q 306
QKKJK 207
QTQTQ 791
2J9QA 344
T84QQ 137
J4822 90
77J77 800
99994 858
JK6J7 833
QQ472 589
389K6 761
K35K4 547
22244 284
AT78K 164
A848J 798
57782 924
AT998 660
TQ8TT 663
4J285 890
Q7JQQ 960
88JJJ 370
JKKK7 866
22J2J 916
JT333 292
555JJ 267
7K75K 228
4Q46J 66
43T63 695
T6TTT 606
QQQ82 154
86JKT 700
KK464 111
9QTJ8 541
QJJQQ 386
J5989 110
4JAJT 794
7K7K6 707
K4484 747
JJK9J 3
97555 10
6QJ74 717
95582 975
T7468 51
A37A3 416
KK888 639
J2223 233
8T7AA 944
A3A78 16
739T6 850
945T2 654
6J633 41
2T222 339
27469 851
TT333 811
A7JA8 129
T6T93 995
75488 459
JQJ58 376
7J6QQ 941
TTTT8 787
27JJJ 705
JT3Q3 983
7KKK6 668
88899 162
336K7 893
5A35A 950
T8T88 903
7Q4K7 274
22K27 429
838J8 469
27257 792
J666J 560
AA2AT 554
22228 112
4997K 943
KJ3J2 431
KQ373 984
9J694 901
65259 917
58885 372
JT634 45
K5777 848
33TTT 720
33233 422
26J7K 114
K8T45 170
92A5K 480
84884 218
94739 739
3472J 815
J5AT4 383
8QJ3Q 946
T99T6 891
46674 135
T66J7 125
738QQ 100
TT4T8 490
98268 765
465T6 477
J77QQ 624
9K98J 199
J6666 176
23KTJ 69
7779Q 563
46T7J 871
8QQQQ 442
84TK8 965
KA3T9 326
AKT25 448
2J65J 253
7KK77 714
74Q44 36
A498A 684
359AK 615
TTTQ5 874
J22JJ 121
25247 59
AJ322 613
26222 27
A57T5 355
89886 544
K9333 104
36J98 566
KQKJ4 142
22276 716
Q7222 436
AAAA4 499
66KK3 68
89629 909
T9KK9 208
5ATT8 646
69J59 894
J68T6 744
57A2K 454
93585 92
JQT63 485
4K4AA 877
9936K 986
6KK6K 65
44484 841
76557 672
8T273 882
QQ9QQ 956
K6549 863
3QJ39 324
KKKJK 565
737Q7 562
99494 641
TJTJT 445
46AT4 728
8K2AT 896
2QT22 590
K7JTK 156
2K929 503
TT2JT 799
JAK7A 213
32K59 470
87899 881
K2KK4 579
K3AJ5 588
68666 461
Q4QQK 727
QA9K8 261
95999 122
5A446 885
3J335 291
8K685 453
K5KA5 231
37KJK 586
KQ6Q6 532
QKKKA 82
9KJ36 846
83JJ6 202
33T33 466
QQQAQ 439
Q4A94 282
35AJT 577
47ATQ 753
44AAQ 745
3AA99 330
88533 774
T9T6T 971
5KT6T 685
A999Q 913
59555 44
6J66Q 196
TA542 268
55598 487
926A7 523
4Q3J9 693
47274 582
2Q999 830
J599T 574
T6TTJ 116
6K5A2 358
88J8A 580
T22K2 161
444A4 884
A5J7A 842
3JT3T 101
TATTA 279
82A82 531
A9JTA 120
KK4KT 60
88J8K 314
JKKJJ 722
37797 467
AA999 555
52543 145
55Q55 83
4444J 408
TTT97 232
TKTTK 243
8J882 602
AJK6Q 724
32TK9 536
7569Q 823
37777 410
27772 462
6T6JA 932
99448 797
69669 659
83T89 382
QQ68Q 392
Q94TK 390
4TTTT 8
Q7QA7 998
8JT8A 237
K7J77 74
AT5TT 518
6KK66 336
83388 89
867Q2 629
Q9889 409
8J7A6 616
333Q3 511
333KQ 879
9TAT9 319
KQJ46 819
2AA4A 93
27774 849
2T6J4 194
TTKKA 597
K9437 535
K4J48 48
A5J52 86
22266 952
AQ6Q6 245
QJ24T 669
QA779 638
Q4263 694
QQ7QQ 421
9942J 174
TJTJK 173
T96A9 832
55553 608
K78KA 127
444QQ 305
AA99A 516
33J22 348
Q7TQT 25
87888 793
86884 217
94Q99 742
A3336 514
K6492 748
36363 201
JT657 474
AK766 905
Q333J 788
494Q4 171
67776 144
33939 701
J8265 557
97KK7 197
4T5TJ 614
44494 109
99J79 192
3A9Q9 977
77783 205
A4575 14
8K9QT 226
8555J 32
JAAAA 818
4T4T4 428
6J6J2 378
55534 471
76J5J 752
3J58J 189
7A447 681
9T5TJ 501
43KAJ 222
TTJT5 524
QA9Q5 755
93Q74 23
34344 781
AQT3A 696
A5855 766
T532J 259
4J278 839
4J56Q 645
5J588 853
67K3A 238
88938 674
J8A3A 852
2883T 402
8Q337 637
TTT9T 732
T3666 978
537J8 128
56794 167
3AAQQ 356
38J38 593
JJAAA 153
7676A 301
AT79K 906
T6T3T 962
K845K 95
4KT79 573
T5956 825
2J424 969
A7847 478
8T8K8 919
T88T4 310
J92J2 368
6Q636 64
5943Q 56
3KKK4 786
45542 746
Q6838 551
8665J 1000
A3757 312
KAT4Q 721
2T623 488
887J7 252
5JK55 495
389J5 353
77877 13
8A2QJ 103
JQ798 342
85TQ2 709
QKJ63 39
5Q5Q5 836
66762 940
33AAA 293
TJTTT 472
6A7Q2 520
54455 671
334QA 75
JQ455 169
A4447 360
77755 484
KK8K8 394
2KAAA 289
7KJ44 886
43444 286
5T862 569
333K3 113
A5J85 508
4A3J2 105
42J92 224
95922 255
5947A 961
K3JJ7 507
44J49 581
4474T 712
AT7TT 273
74667 925
JT737 990
6T222 991
TT2JJ 70
52225 159
66J6A 743
53533 227
9J99Q 600
85888 840
22527 287
67A52 895
8888A 406
Q5Q8Q 652
J77JJ 807
K2252 605
AA5AA 381
66966 505
T87A5 933
K2848 620
JQQTQ 140
JT889 953
7948K 989
8648J 393
AAQAA 862
69969 42
9Q998 251
45KKK 157
362QA 907
JQ9KQ 430
99JQA 838
QKKQ4 195
86688 463
5736T 126
J5929 62
6TAQK 198
378K4 537
TA3T3 84
3QQQ8 733
83T32 178
K3K23 997
TAAAA 618
3J6J3 979
89QQ9 810
7Q755 299
7A875 423
93275 813
89K8A 118
KKTKT 320
Q6K68 689
9TK58 481
47927 612
2A3AJ 515
3K343 585
52554 859
A7A77 265
Q88AT 938
4T3JQ 601
Q9333 350
A2A46 374
Q9JT9 327
KQ286 254
QQ2J8 837
3J333 784
7777K 587
252JQ 527
42222 985
87QQ8 939
6JK35 482
5KTQ9 139
QQ4JQ 647
93J37 546
KTA8J 782
5A597 741
A4JAA 385
QTAQT 29
AAAKA 545
7722Q 132
QQ44J 401
4Q3QQ 43
J5494 244
3K884 844
24662 828
2K552 591
59K24 108
4T43T 816
AAJ44 434
KQKQQ 285
33433 340
33449 414
9TTTJ 568
JTT64 177
45J54 730
66965 492
TJJK2 313
A8KQ2 298
JQ683 564
927KK 777
JJJJJ 550
888J6 679
5KJ7K 834
QQQQ6 650
KKK6K 625
9KJKA 678
47Q77 35
6262J 163
47T3A 78
84J82 166
594KA 649
27272 607
9JTT2 420
9K9KK 180
6238A 22
893KJ 987
4544J 389
88KT6 783
696AJ 611
7A2A7 486
7845J 335
T3488 927
5AAA5 52
T6TT5 234
JTT2A 296
7J747 456
28J22 785
Q8AQ9 908
72JJT 898
A86J5 440
94545 94
T4553 71
2J96Q 216
95T45 264
KKJ2K 223
JA59A 682
722AA 692
3434T 572
8KK97 806
2TA2J 517
3KKTK 526
ATJ6K 19
A9K9A 124
4K943 235
9A999 395
74K7K 530
666J2 757
9J888 627
5J572 734
J8888 387
478QA 417
82K5A 667
KK47K 809
J3743 81
T2TA8 945
A557A 698
93939 583
488KK 384
46464 778
76665 427
2J4A4 367
89663 632
24444 450
9K8T6 444
3393T 438
545J5 910
QQJQQ 821
5A4J4 972
AAQJA 379
79977 40
AT33A 812
6J669 856
6JKK7 211
J2K22 61
28228 930
J69AA 210
7348J 657
975J5 37
6J787 920
7J7J7 34
96J2J 458
8888K 117
4Q867 375
JA2AT 58
38535 294
Q5TT7 17
AK58K 9
45KQ2 57
4J477 411
29TA7 750
88Q2T 644
Q39Q6 767
56T87 258
37997 715
77T77 814
63KJT 489
22722 963
K9999 723
57J55 887
79J94 12
Q77AA 278
7ATQ3 861
Q5QQ4 570
AAA7A 457
84267 91
5555J 146
45544 246
3558A 106
J97A2 179
T3422 2
78878 441
44A4Q 796
QJQ8Q 519
KQ83Q 333
3K4K3 283
A4AA4 548
72K63 864
854T7 622
68968 373
8K7J2 18
K923Q 186
22229 131
AJ7KT 621
K8KJ7 559
4Q444 540
TT6AK 921
55J25 804
66998 900
555KK 736
J33A3 388
J3677 6
K85A7 665
K94TJ 735
T6AQT 415
5Q68Q 133
T38T9 256
349T7 677
9QTQ2 99
63644 413
68J86 876
63366 1
AKAJT 703
25555 248
Q4788 239
TTTKT 214
TAT3K 957
29292 315
QATQQ 329
5ATA5 15
3A3A2 183
66787 424
5QT9T 775
55K35 934
K5T4Q 230
667Q6 115
Q83J8 275
6555J 522
44AK4 711
TT2TT 923
JA33A 432
2272J 922
58787 688
423QA 528
7JK55 529
68T9J 297
89777 280
655T5 483
33384 948
46258 404
TT77T 955
8AAAA 918
JQ478 928
62422 38
2Q2QQ 754
6QT54 630
Q4Q4Q 191
3J22K 826
4J499 889
26J25 875
69T2K 184
93333 702
425TK 726
Q745J 220
85J29 346
T4858 935
43A38 634
7JA7A 165
JQ6QQ 247
T6282 46
J9343 363
84383 300
7J737 609
Q9A89 123
T8T8T 77
95AK7 98
87A86 345
5482A 304
33338 542
9TJQ6 188
9883J 26
5J537 914
9JQ45 820
T2T2A 316
2KKKK 209
7529K 974
7677Q 263
88QK8 912
486Q6 764
AA3TJ 331
47334 7
JK8J8 455
KKQJ5 740
99J9T 999
J8AKA 805
Q5TQJ 966
6T66T 988
74J39 892
A7JA6 357
534QQ 433
3J586 994
TJ32Q 193
K3KKK 738
J8488 55
93AA6 399
28J82 595
A7328 262
366J6 656
KJ397 640
37A77 72
696AA 412
76J77 426
K3444 676
QJQKQ 168
AA7KK 633
KKJAA 951
32Q2Q 31
5Q6K9 981
58252 636
8A887 11
67788 479
KAQKA 760
K7KK7 635
K2555 666
5K226 683
27JT2 521
AKA88 308
938Q4 776
JA5A5 790
AK66K 468
63JT5 772
9Q47K 33
5K2JQ 405
36K63 354
7T8TT 270
68644 212
2K2K7 460
A7ATT 172
J8K8T 949
62656 780
444JT 276
K8KK7 690
48K3Q 822
AQQ86 525
6A98J 899
22256 789
32794 673
2835K 20
45456 362
88555 200
Q635T 396
QT646 662
KK8KK 556
QQ282 76
655J6 119
33363 931
AA8J8 599
A2A22 182
2A293 623
T849J 96
52286 699
82A59 138
QTQQ8 369
Q844T 795
6Q666 67
KQQQQ 549
8TA8A 992
74444 338
J6543 498
43JTT 80
85555 710
Q6QKQ 134
QQ3Q3 691
Q3499 576
6TQ48 706
QQQ37 758
J888J 642
8Q88Q 494
26293 708
J66J3 343
QT464 317
TTT59 558
QA9KQ 309
3TJTT 883
9655K 204
J6999 311
KTT9K 584
K9K92 868
97752 855
AAT6T 504
9298A 976
T37J3 337
467K7 141
99QQ9 250
KJ29Q 857
22J42 295
4T27A 870
2J533 888
TAA98 631
K3336 768
544A5 926
42657 725
8533K 260
AAA2J 400
57995 452
4JKJQ 509
QQK59 867
TQ469 206
A844A 380
263TJ 731
79J27 185
9J562 269
2J222 552
J7494 447
TAA3T 493
2A49Q 658
33299 435
5QQQQ 513
9999J 281
T5KK2 341
KJJJ6 451
K7K5Q 323
58QKA 648
JK5KK 24
K337K 937
QJ468 302
KA43T 854
3TTTT 697
9KKKK 5
9T3TT 352
48788 152
KKJQA 361
9954J 349
TTQJ5 538
QTTTT 229
6Q976 533
4666J 221
A3323 351
Q7778 770
55JTK 73
5K593 594
222A2 878
3KQJK 598
7K53K 446
AAJA8 817
3Q269 272
QKQAQ 729
QQ9Q5 675
7J7A7 147
JJ99K 603
58T8T 303
33572 911
94J99 824
9JA33 130
J4446 670
J5A9Q 158
6AAJA 359
K48KK 954
QJQ79 102
7KKAK 964
56Q73 242
AJKJK 322
6TT84 539
757J7 437
6T666 718
TA2QA 476
23327 241
44225 510
949A9 571
399Q9 97
J97J9 391
9AA5A 664
89599 288
3JA4T 87
T3869 151
9A599 88
8K884 465
KTKKJ 973
78K65 506
AAAA9 407
22322 553
KQ752 54
KKK55 136
8K76K 604
555TK 266
49K3A 497
8JJJJ 769
`);
