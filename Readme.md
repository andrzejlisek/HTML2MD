# General purpose and how to convert

The HTML2MD is the simple converter from HTML to Markdown\. It allows using many simple WYSIWYG or WYSIWYM HTML editors to mage Markdown documents\. This script was tested using Microsoft FrontPage Express, which is freware and very simple WYSIWYG HTML editor and has enough features to mahe these documents\. You can use any WYSIWYG or WYSIWYM HTML editor to make Markdown files by WYSIWYG/WYSIWYM approach, using HTML file as document source\.

To convert HTML file, define **SCRIPT** tag with source as **html2md\.js** at the end of the HTML file\. In the browser, there will be displayed confirmation question about converting to Markdown\. If you confirm this conversion, there will be displayed Markdown source text istead of HTML contents, otherwise, the HTML contents will be persisted\. All the text elements will have escape sequences at the control characters\.

# Tag conversion

The conversion is based on tag parsing\. The HTML doctype definition and the all code outsode the BODY tag is ignored\. When the HTML document contains non\-ANSI characters, is should be saved using UTF\-8 encoding\.

The following tags are parsed in conversion, the tag attributes are ignored:

| Tag name | Markdown equivalent | Parse inner HTML |
| --- | --- | --- |
| P | Paragraph | Yes |
| H1 | Header 1 | Yes |
| H2 | Header 2 | Yes |
| H3 | Header 3 | Yes |
| H4 | Header 4 | Yes |
| H5 | Header 5 | Yes |
| H6 | Header 6 | Yes |
| BR | Line break in one paragraph | No |
| STRONG, B | Bold text | Yes |
| EM, I | Italic text | Yes |
| STRIKE, S | Strikethrough text | Yes |
| A | Link | Yes |
| IMG | Image | No |
| HR | Horizontal rule | No |
| TT | Code inside the text | Yes |
| PRE | Code outside the paragraph | Yes |
| TABLE | Table or quote | Special \(see below\) |
| BLOCKQUOTE | Quote | Yes |
| UL | Unordered list | Yes |
| OL | Ordered list | Yes |
| DL | Term definition list | Yes |
| DT | Term phrase in definition list | Yes |
| DD | Term definition in definition list | Yes |

The following tags are ignored \(not has an Markdown equivalent\), but the inner HTML will be parsed\.


* U
* FONT
* SPAN

The other tags, which are not mentioned above, are ignored, when this tag has inner HTML, these HTML will also be ignored\. The converter does not validate input HTML\.

# Table conversion

When the has more than one row or has more than one column, this table will be converted into Markdown table\. The TD and TH cell tags hase exactly the same meaning\. The alignment of the TD/TH tags in the first row determines alignment for the whole column \(the Markdown can not align one cell, it can align whole column only\)\. Alignment of the other rows than the first row is ignored\. The Microsoft FrontPage Express sets left alignment for TD cell and center alignment for the TH cell, so this application does not save alignment attribute when the cell is alignment to left \(alignment of objects inside the cell is ignored\)\. This allows to combine TD and TH tags in one table, in some cases this combination is forced, depending on used WYSIWYG editor\.

Inside the table, tag conversion slighty differs than tag conversion outside the table:

| Tag name | Markdown equivalent | Parse inner HTML |
| --- | --- | --- |
| BR | Print <BR> in Markdown text to force line break inside cell | No |
| STRONG, B | Bold text | Yes |
| EM, I | Italic text | Yes |
| STRIKE, S | Strikethrough text | Yes |
| A | Link | Yes |
| IMG | Image | No |
| TT | Code inside the text | Yes |
| PRE | Code outside the paragraph | Yes |

The following tags inside the table are ignored, but the inner HTML will be parsed:


* P
* H1
* H2
* H3
* H4
* H5
* H6
* U
* FONT
* SPAN

The other tags, which are not mentioned above, are ignored\. The column spanning and cell spanning is not supported due to Markdown limitations\.

## Table examples

The header text is shorter than the longest text\.

| Not aligned | Left align | Center align | Right align |
| --- | :--- | :---: | ---: |
| A | B | C | D |
| AAA | BBB | CCC | DDD |

The header text is longer than the longest text\.

| None | Left | Center | Right |
| --- | :--- | :---: | ---: |
| AAAAAAAAAA | BBBBBBBBBB | CCCCCCCCCC | DDDDDDDDDD |
| AAA | BBB | CCC | DDD |

The format text abilities

| Tag | Example |
| --- | --- |
| BR | First line<br> Second line |
| STRONG | **Bold text** |
| EM | *Italic text* |
| TT | The `code` example |
| PRE | `The code example`  |

Inside table cell, when PRE is used, the line breaks inside the PRE will be replaced into spaces\.

# Quote

The quote can be defined by TABLE, which has only one row and only one column, or by BLOCKQUOTE tag\.

## Quote by TABLE

Text before quote

> 
> Text at the ending of quote
> 

Text after quote

## Quote by BLOCKQUOTE

Text before quote

> Text at the beginning of quote
> 
> > Nested quote
> > 
> 
> Text at the ending of quote
> 

Text after quote

## Remarks

In the quote element \(both by TABLE cell and by BLOCKQUOTE tag\), the every element must be inside HTML tag, for example, inside the P tag\. The text without tag will be ignored\. Some WYSIWYG editors can make the first line without tag and the second line in the same cell will treat as paragraph \(inside P\)\. In such case, the first line will be ignored, but the other lines will be parsed\.

# The other format examples

## Unordered list

Text before the list


* First
  * First\-first
  * First\-second
    * First\-second\-first
    * First\-second\-second
  * First\-third
* Second
  * Second\-first
  * Second\-second
* Third

Text after the list

## Ordered list

Text before the list


1. First
   1. First\-first
   2. First\-second
      1. First\-second\-first
      2. First\-second\-second
   3. First\-third
2. Second
   1. Second\-first
   2. Second\-second
3. Third

Text after the list

## Term definition

Text before term list



First Term
: This is the definition of the first term\.

Second Term
: This is one definition of the second term\.
: This is another definition of the second term\.

Text after term list

## Horizontal rule

Text before horizontal rule

***

Text after horizontal rule

## Image and link

Image without link: ![Wikipedia](https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png "Wikipedia")

Link without image: [LINK](https://www.wikipedia.org/ "https://www.wikipedia.org/")

Image as link: [![](https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png "")](https://www.wikipedia.org/ "https://www.wikipedia.org/")

## Headers

### Header 3

#### Header 4

##### Header 5

###### Header 6

## Other text formating examples

Line break  
within  
the same paragraph\.

Text can be formatted as **bold**, *italic* and ***bold\-italic***\. The text can be ~~strikethrough~~ and can contain `code` words\. The underline is not supported by current version of Markdown\.

The code as paragraph can be written using PRE tag:

```
The first code line
The second code line
The third code line
```

At the end of the HTML document, there is the Javascript HTML2MD call, which will not be included in the result Markdown code\.




