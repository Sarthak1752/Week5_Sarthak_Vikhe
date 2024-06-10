import { Request, Response } from 'express';
import  Shift  from '../models/shift';
import { Workbook } from 'exceljs';

const generateReport = async (req: Request, res: Response) => {
  try {
    const shifts = await Shift.findAll();
    
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Report');

    worksheet.columns = [
      { header: 'Employee ID', key: 'employeeId', width: 25 },
      { header: 'Start Time', key: 'startTime', width: 25 },
      { header: 'End Time', key: 'endTime', width: 25 },
      { header: 'Actual Hours', key: 'actualHours', width: 25 },
      { header: 'Assigned Shift Hours', key: 'assignedShiftHours', width: 25 },
    ];

    shifts.forEach((shift) => {
      worksheet.addRow({
        employeeId: shift.employeeId,
        startTime: shift.startTime,
        endTime: shift.endTime,
        actualHours: shift.actualHours,
        assignedShiftHours: shift.assignedShiftHours,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error });
  }
};

export { generateReport };
