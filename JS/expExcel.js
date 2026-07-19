//================================
//         ELEMENTS
//=================================

const excelButton =document.getElementById('getExcel');
const pdfButton =document.getElementById('getPdf');

function exportToExcel(){

    const transactions =
    InventoryEngine.getTransactions();

    if(transactions.length===0){

        alert("No transactions found.");

        return;

    }

    const rows =

    transactions.map(t=>({

        "Date":
            t.date.display,

        "Movement ID":
            t.movementId,

        "Transaction":
            t.type,

        "Product":
            t.productName,

        "Supplier":
            t.supplier,

        "Quantity":
            t.quantity,

        "Balance":
            t.balance,

        "Cost Price":
            t.costPrice,

        "Selling Price":
            t.sellingPrice,

        "Purchase ID":
            t.purchaseId,

        "Room ID":
            t.roomId,

        "Reference":
            t.reference

    }));


    const worksheet =

    XLSX.utils.json_to_sheet(rows);

    const workbook =

    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Inventory Transactions"

    );


    worksheet["!cols"]=[

        {wch:22},
        {wch:22},
        {wch:18},
        {wch:30},
        {wch:25},
        {wch:10},
        {wch:10},
        {wch:14},
        {wch:14},
        {wch:20},
        {wch:25},
        {wch:20}

    ];


    XLSX.writeFile(

        workbook,

        `Inventory_Report_${new Date().toISOString().split("T")[0]}.xlsx`

    );

}

function exportToPDF(){

    const transactions =
    InventoryEngine.getTransactions();

    if(transactions.length===0){

        alert("No transactions found.");

        return;

    }

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(

        "Inventory Transactions Report",

        14,

        18

    );

    doc.setFontSize(10);

    doc.text(

        "Generated: " +

        new Date().toLocaleString(),

        14,

        26

    );


    const rows =

    transactions.map(t=>([

        t.date.display,

        t.type,

        t.productName,

        t.quantity,

        t.balance,

        t.costPrice,

        t.sellingPrice,

        t.reference

    ]));


    doc.autoTable({

        startY:35,

        head:[[

            "Date",

            "Type",

            "Product",

            "Qty",

            "Balance",

            "Cost",

            "Selling",

            "Reference"

        ]],

        body:rows,

        theme:"grid",

        headStyles:{

            fillColor:[37,99,235]

        },

        styles:{

            fontSize:8

        }

    });


    doc.save(

        `Inventory_Report_${new Date().toISOString().split("T")[0]}.pdf`

    );

}
