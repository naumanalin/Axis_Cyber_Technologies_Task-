export const processData = (transactions, type) => {
    if (!transactions || !type) return [];
    
    const categoryMap = transactions.reduce((acc, transaction) => {
      if (transaction.type === type) {
        const category = transaction.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + transaction.amount;
      }
      return acc;
    }, {});
  
    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value: Math.abs(value)
    }));
  };