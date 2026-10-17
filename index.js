#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

program
  .version('1.0.0')
  .description('CLI tool to generate Next.js components with TypeScript and Tailwind CSS')
  .argument('<component-name>', 'Name of the component (e.g., Navbar)')
  .option('-t, --test', 'Generate a Jest/React Testing Library test file') // اضافه شدن فلگ تست
  .action(async (componentName, options) => {
    const componentPath = path.join(process.cwd(), 'src', 'components', componentName);

    if (fs.existsSync(componentPath)) {
      console.log(chalk.red(`❌ Component "${componentName}" already exists!`));
      process.exit(1);
    }

    try {
      await fs.ensureDir(componentPath);

      const tsxContent = `import React from 'react';

interface ${componentName}Props {
  // Add props here
}

export const ${componentName}: React.FC<${componentName}Props> = ({}) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">${componentName} Component</h2>
    </div>
  );
};
`;

      const indexContent = `export * from './${componentName}';\n`;

      await fs.writeFile(path.join(componentPath, `${componentName}.tsx`), tsxContent);
      await fs.writeFile(path.join(componentPath, 'index.ts'), indexContent);
      
      console.log(chalk.green(`✅ Component "${componentName}" created successfully!`));

      if (options.test) {
        const testContent = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName} Component', () => {
  it('renders without crashing', () => {
    render(<${componentName} />);
    const heading = screen.getByRole('heading', { name: /${componentName} Component/i });
    expect(heading).toBeInTheDocument();
  });
});
`;
        await fs.writeFile(path.join(componentPath, `${componentName}.test.tsx`), testContent);
        console.log(chalk.blue(`🧪 Test file created: ${componentName}.test.tsx`));
      }

      console.log(chalk.cyan(`📂 Path: src/components/${componentName}`));
      
    } catch (error) {
      console.log(chalk.red('❌ Error creating component:'), error);
    }
  });

program.parse(process.argv);