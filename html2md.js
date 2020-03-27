// https://daringfireball.net/projects/markdown/syntax#em
// https://www.markdownguide.org/basic-syntax/
// https://www.markdownguide.org/extended-syntax/
// https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet


// Insert element to print Markdown code
var OutputElement = document.createElement("pre");
OutputElement.id = 'OutputElement';
OutputElement.innerHTML = "";


// Append "replace all" function to "String" type
String.prototype.replaceAll = function(search, replacement)
{
    var target = this;
    return target.split(search).join(replacement);
};


// Print text
function Print(X)
{
    X = X.replaceAll("&", "&amp;");
    X = X.replaceAll("<", "&lt;");
    X = X.replaceAll(">", "&gt;");
    X = X.replaceAll("\"", "&quot;");
    OutputElement.innerHTML += X;
}

// Print end of line
function PrintLine()
{
    OutputElement.innerHTML += "\n";
}

// Clear text from multiple spaces and end of lines
function ClearText(X, M, Q)
{
    if (M == 2)
    {
        var QQ = "";
        while (Q > 0)
        {
            QQ = QQ + "> ";
            Q--;
        }
        return QQ + X.replaceAll("\n", "\n" + QQ);
    }
    if (M == 3)
    {
        return X.replaceAll("\n", " ");
    }

    X = X.replaceAll("\\", "\\\\");
    X = X.replaceAll("`", "\\`");
    X = X.replaceAll("*", "\\*");
    X = X.replaceAll("_", "\\_");
    X = X.replaceAll("{", "\\{");
    X = X.replaceAll("}", "\\}");
    X = X.replaceAll("[", "\\[");
    X = X.replaceAll("]", "\\]");
    X = X.replaceAll("(", "\\(");
    X = X.replaceAll(")", "\\)");
    X = X.replaceAll("#", "\\#");
    X = X.replaceAll("+", "\\+");
    X = X.replaceAll("-", "\\-");
    X = X.replaceAll(".", "\\.");
    X = X.replaceAll("!", "\\!");
    X = X.replaceAll("|", "&#124;");
    X = X.replaceAll("\n", " ");
    while (X != X.replaceAll("  ", " "))
    {
        X = X.replaceAll("  ", " ");
    }
    if (M == 1)
    {
        while ((X.length > 1) && (X[0] == " "))
        {
            X = X.substring(1);
        }
    }
    return X;
}


function ValPos(X)
{
    if (X < 0)
    {
        return (0 - X);
    }
    else
    {
        return (X);
    }
}

function ValNeg(X)
{
    if (X > 0)
    {
        return (0 - X);
    }
    else
    {
        return (X);
    }
}

function PrintQuote(Q)
{
    while (Q > 0)
    {
        Print("> ");
        Q--;
    }
}

function PrintListPoint(D, O)
{
    if (D > 0)
    {
        if (O < 0)
        {
            while (D > 1)
            {
                Print("  ");
                D--;
            }
            Print("* ");
        }
        else
        {
            while (D > 1)
            {
                Print("   ");
                D--;
            }
            Print(O + ". ");
        }
    }
    if (D < 0)
    {
        while (D < 0)
        {
            if (O < 0)
            {
                Print("  ");
            }
            else
            {
                Print("   ");
            }
            D++;
        }
    }
}

function PrintPrepare(ParagraphMode)
{
    if (ParagraphMode[0] == 1)
    {
        PrintQuote(ParagraphMode[3]);
        PrintListPoint(ParagraphMode[1], ParagraphMode[2][ParagraphMode[1]]);
        ParagraphMode[0] = 0;
    }
}

// Parse HTML object inside table cell
function HtmlParseTable(Obj, Depth, ParagraphMode)
{
    var I = true;
    var Children = false;
    var Name = "";
    if (Obj instanceof HTMLElement)
    {
        Name = Obj.nodeName;
        I = false;
    }
    if (Obj instanceof Text)
    {
        var Val = Obj.textContent;
        Print(ClearText(Val, ParagraphMode[0], 0));
    }

    switch (Name)
    {
        case "P":
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
        case "U":
        case "FONT":
        case "SPAN":
            Children = true;
            break;
        case "STRONG":
        case "B":
            Print("**");
            Children = true;
            break;
        case "EM":
        case "I":
            Print("*");
            Children = true;
            break;
        case "STRIKE":
        case "S":
            Print("~~");
            Children = true;
            break;
        case "TT":
            Print("`");
            Children = true;
            break;
        case "PRE":
            Print("`");
            ParagraphMode[0] = 3;
            Children = true;
            break;
        case "BR":
            Print("<br>");
            break;
        case "A":
            Print("[");
            Children = true;
            break;
        case "IMG":
            Print("![" + Obj.alt + "](" + Obj.src + " \"" + Obj.alt + "\")");
            break;
    }

    if (Children)
    {
        for (I = 0; I < Obj.childNodes.length; I++)
        {

            HtmlParseTable(Obj.childNodes[I], Depth + 1, ParagraphMode);
        }
    }

    switch (Name)
    {
        case "STRONG":
        case "B":
            Print("**");
            break;
        case "EM":
        case "I":
            Print("*");
            break;
        case "STRIKE":
        case "S":
            Print("~~");
            break;
        case "TT":
            Print("`");
            break;
        case "PRE":
            Print("`");
            ParagraphMode[0] = 0;
            break;
        case "A":
            Print("](");
            Print(Obj.href);
            Print(" \"");
            Print(Obj.href);
            Print("\")");
            break;
    }
}



// Parse HTML object
function HtmlParse(Obj, Depth, ParagraphMode)
{
    var ParagraphMode_ = [0, ParagraphMode[1], ParagraphMode[2], ParagraphMode[3]];
    var I = true;
    var Children = false;
    var Name = "";
    if (Obj instanceof HTMLElement)
    {
        Name = Obj.nodeName;
        I = false;
    }
    if (Obj instanceof Text)
    {
        var Val = Obj.textContent;
        //var Val = Obj.wholeText;
        //var Val = Obj.nodeValue;

        if (Depth > 1)
        {
            if (ParagraphMode[0] >= 0)
            {
                if (ParagraphMode[0] == 1)
                {
                    PrintQuote(ParagraphMode[3]);
                    PrintListPoint(ParagraphMode[1], ParagraphMode[2][ParagraphMode[1]]);
                }
                Print(ClearText(Val, ParagraphMode[0], ParagraphMode[3]));
                if (ParagraphMode[0] == 1)
                {
                    ParagraphMode[0] = 0;
                }
            }
        }
        I = false;
    }
    if (I)
    {
        alert(Obj);
    }

    switch (Name)
    {
        case "BODY":
        case "P":
            ParagraphMode_[0] = 1;
            Children = true;
            break;
        case "HR":
            PrintQuote(ParagraphMode[3]);
            Print("***");
            PrintLine();
            PrintQuote(ParagraphMode[3]);
            PrintLine();
            break;
        case "BR":
            ParagraphMode[1] = ValNeg(ParagraphMode[1]);
            ParagraphMode[0] = 1;
            Print("  ");
            PrintLine();
            break;
        case "H1":
            ParagraphMode[0] = 1;
            PrintPrepare(ParagraphMode);
            Print("# ");
            Children = true;
            break;
        case "H2":
            ParagraphMode[0] = 1;
            PrintPrepare(ParagraphMode);
            Print("## ");
            Children = true;
            break;
        case "H3":
            ParagraphMode[0] = 1;
            PrintPrepare(ParagraphMode);
            Print("### ");
            Children = true;
            break;
        case "H4":
            ParagraphMode[0] = 1;
            PrintPrepare(ParagraphMode);
            Print("#### ");
            Children = true;
            break;
        case "H5":
            ParagraphMode[0] = 1;
            PrintPrepare(ParagraphMode);
            Print("##### ");
            Children = true;
            break;
        case "H6":
            ParagraphMode[0] = 1;
            PrintPrepare(ParagraphMode);
            Print("###### ");
            Children = true;
            break;
        case "STRONG":
        case "B":
            PrintPrepare(ParagraphMode);
            Print("**");
            Children = true;
            break;
        case "EM":
        case "I":
            PrintPrepare(ParagraphMode);
            Print("*");
            Children = true;
            break;
        case "STRIKE":
        case "S":
            PrintPrepare(ParagraphMode);
            Print("~~");
            Children = true;
            break;
        case "A":
            PrintPrepare(ParagraphMode);
            Print("[");
            Children = true;
            break;
        case "PRE":
            ParagraphMode_[0] = 2;
            PrintQuote(ParagraphMode[3]);
            Print("```");
            PrintLine();
            Children = true;
            break;
        case "UL":
        case "OL":
            ParagraphMode[1] = ValPos(ParagraphMode[1]) + 1;
            ParagraphMode[2][ParagraphMode[1]] = (Name == "UL") ? -1 : 0;
            ParagraphMode_[0] = -1;
            if (Depth == 1)
            {
                PrintQuote(ParagraphMode[3]);
            }
            Children = true;
            break;
        case "LI":
            ParagraphMode[1] = ValPos(ParagraphMode[1]);
            if (ParagraphMode[2][ParagraphMode[1]] >= 0)
            {
                ParagraphMode[2][ParagraphMode[1]]++;
            }
            PrintLine();
            ParagraphMode_[0] = 1;
            Children = true;
            break;
        case "IMG":
            PrintPrepare(ParagraphMode);
            Print("![" + Obj.alt + "](" + Obj.src + " \"" + Obj.alt + "\")");
            break;
        case "TT":
            PrintPrepare(ParagraphMode);
            Print("`");
            Children = true;
            break;
        case "BLOCKQUOTE":
            ParagraphMode[3]++;
            for (I = 0; I < Obj.childNodes.length; I++)
            {
                if (Obj.childNodes[I] instanceof HTMLElement)
                {
                    var T = [ParagraphMode_[0], ParagraphMode[1], ParagraphMode_[2], ParagraphMode[3]];
                    HtmlParse(Obj.childNodes[I], 1, T);
                    ParagraphMode_[0] = T[0];
                    ParagraphMode[1] = T[1];
                    ParagraphMode_[2] = T[2];
                    ParagraphMode[3] = T[3];
                }
            }
            ParagraphMode[3]--;
            break;
        case "TABLE":
            I = false;
            if (Obj.rows.length == 1)
            {
                if (Obj.rows[0].cells.length == 1)
                {
                    I = true;
                }
            }
            if (I)
            {
                // Quote
                ParagraphMode[3]++;
                for (I = 0; I < Obj.rows[0].cells[0].childNodes.length; I++)
                {
                    if (Obj.rows[0].cells[0].childNodes[I] instanceof HTMLElement)
                    {
                        var T = [ParagraphMode_[0], ParagraphMode[1], ParagraphMode_[2], ParagraphMode[3]];
                        HtmlParse(Obj.rows[0].cells[0].childNodes[I], 1, T);
                        ParagraphMode_[0] = T[0];
                        ParagraphMode[1] = T[1];
                        ParagraphMode_[2] = T[2];
                        ParagraphMode[3] = T[3];
                    }
                }
                ParagraphMode[3]--;
            }
            else
            {
                // Table
                for (var TR = 0; TR < Obj.rows.length; TR++)
                {
                    PrintQuote(ParagraphMode[3]);
                    for (var TC = 0; TC < Obj.rows[TR].cells.length; TC++)
                    {
                        Print("| ")
                        for (I = 0; I < Obj.rows[TR].cells[TC].childNodes.length; I++)
                        {
                            var T = [0];
                            HtmlParseTable(Obj.rows[TR].cells[TC].childNodes[I], 1, T);
                        }
                        Print(" ");
                    }
                    Print("|");
                    PrintLine();
                    if (TR == 0)
                    {
                        PrintQuote(ParagraphMode[3]);
                        for (var TC = 0; TC < Obj.rows[TR].cells.length; TC++)
                        {
                            Print("| ")
                            if ((Obj.rows[TR].cells[TC].align == "left") || (Obj.rows[TR].cells[TC].align == "center"))
                            {
                                Print(":");
                            }
                            Print("---");
                            if ((Obj.rows[TR].cells[TC].align == "center") || (Obj.rows[TR].cells[TC].align == "right"))
                            {
                                Print(":");
                            }
                            Print(" ");
                        }
                        Print("|");
                        PrintLine();
                    }
                }
            }
            break;
        case "DL":
            PrintQuote(ParagraphMode[3]);
            Children = true;
            break;
        case "DT":
            PrintLine();
            PrintQuote(ParagraphMode[3]);
            PrintLine();
            PrintQuote(ParagraphMode[3]);
            Children = true;
            break;
        case "DD":
            PrintLine();
            PrintQuote(ParagraphMode[3]);
            Print(": ");
            Children = true;
            break;
        case "U":
        case "FONT":
        case "SPAN":
            Children = true;
            break;
    }

    if (Children)
    {
        for (I = 0; I < Obj.childNodes.length; I++)
        {
            var Allowed = true;
            if (Name == "DL")
            {
                Allowed = (Obj.childNodes[I] instanceof HTMLElement);
            }
            if (Allowed)
            {
                var T = [ParagraphMode_[0], ParagraphMode[1], ParagraphMode_[2], ParagraphMode[3]];
                HtmlParse(Obj.childNodes[I], Depth + 1, T);
                ParagraphMode_[0] = T[0];
                ParagraphMode[1] = T[1];
                ParagraphMode_[2] = T[2];
                ParagraphMode[3] = T[3];
            }
        }
    }

    switch (Name)
    {
        case "TABLE":
        case "BLOCKQUOTE":
            PrintQuote(ParagraphMode[3]);
            PrintLine();
            break;
        case "P":
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
            PrintLine();
            PrintQuote(ParagraphMode[3]);
            PrintLine();
            break;
        case "LI":
            ParagraphMode[0] = -1;
            break;
        case "BR":
            break;
        case "STRONG":
        case "B":
            Print("**");
            break;
        case "EM":
        case "I":
            Print("*");
            break;
        case "STRIKE":
        case "S":
            Print("~~");
            break;
        case "A":
            Print("](");
            Print(Obj.href);
            Print(" \"");
            Print(Obj.href);
            Print("\")");
            break;
        case "TT":
            Print("`");
            break;
        case "PRE":
            PrintLine();
            PrintQuote(ParagraphMode[3]);
            Print("```");
            PrintLine();
            PrintQuote(ParagraphMode[3]);
            PrintLine();
            break;
        case "UL":
        case "OL":
            ParagraphMode[0] = -1;
            ParagraphMode[1] = ValPos(ParagraphMode[1]) - 1;
            if (Depth == 1)
            {
                PrintLine();
                PrintQuote(ParagraphMode[3]);
                PrintLine();
            }
            break;
        case "DL":
            PrintLine();
            PrintQuote(ParagraphMode[3]);
            PrintLine();
            break;
    }
}

HtmlParse(document.body, 0, [0, 0, [], 0]);

while (document.body.childNodes.length > 0)
{
    document.body.lastChild.remove();
}

document.body.appendChild(OutputElement);
