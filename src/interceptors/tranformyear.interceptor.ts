import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformBudgetYearsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) {
          return data.map(item => this.transformItem(item));
        } else {
          return this.transformItem(data);
        }
      }),
    );
  }

  private transformItem(item: any) {
    return {
      ...item,
      budgetYears: this.transformBudgetYears(item.budgetYears),
    };
  }

  private transformBudgetYears(budgetYears: any[]) {
    const result = {};
    budgetYears.forEach(yearData => {
      result[yearData.year] = {
        id: yearData.id,
        amount: yearData.amount,
        price: yearData.price,
      };
    });
    return result;
  }
}
