---
name: api-chart-visualization
description: Use this skill when the user wants to create data visualizations (charts, graphs) by fetching data from public APIs. Triggers include requests to create charts using API data, visualize data from web services, build dashboards with external data sources, or any task combining API data retrieval with chart generation. Also use when the user mentions specific public APIs (like weather APIs, financial APIs, statistics APIs) and wants to visualize the results.
---

# API Chart Visualization

This skill guides Claude through creating data visualizations using data from public APIs.

## Core Workflow

When a user requests a chart based on API data:

1. **Identify data requirements**: Determine what data points are needed (at least 2-10 data points as shown in examples)
2. **Select or verify API**: Use the specified API or recommend a suitable public API
3. **Fetch data**: Make API calls to retrieve the required data
4. **Process data**: Transform API response into chart-ready format
5. **Create visualization**: Generate an appropriate chart (examples show stacked bar charts as one option)
6. **Include legend**: Ensure charts have proper legends and labels

## API Data Fetching

When fetching from public APIs:

```python
import requests
import json

# Example API call structure
response = requests.get('https://api.example.com/endpoint')
data = response.json()

# Process data for charting
chart_data = process_api_response(data)
```

Always handle potential API errors:
- Check response status codes
- Validate data structure
- Provide fallback or error messages if API fails

## Chart Creation

Based on the example image provided, charts should include:

### Visual Elements
- **Multiple data series**: Support stacked or grouped visualizations (example shows "London" and "Berlin" series)
- **Proper legends**: Include legend (圖例) showing what each color/series represents
- **Axis labels**: Clear labeling for both axes
- **Title**: Descriptive chart title (圖表)
- **Monthly/temporal data**: Support time-based data (Jan-Aug shown in example)

### Recommended Libraries

**For React/JSX artifacts:**
```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Stacked bar chart example
<BarChart width={600} height={400} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="london" stackId="a" fill="#82ca9d" />
  <Bar dataKey="berlin" stackId="a" fill="#8884d8" />
</BarChart>
```

**For Python (matplotlib/seaborn):**
```python
import matplotlib.pyplot as plt
import numpy as np

# Create stacked bar chart
fig, ax = plt.subplots(figsize=(10, 6))
x = np.arange(len(months))
ax.bar(x, london_data, label='London', color='#82ca9d')
ax.bar(x, berlin_data, bottom=london_data, label='Berlin', color='#8884d8')
ax.set_xlabel('Month')
ax.set_ylabel('Value')
ax.set_title('Chart Title')
ax.legend()
plt.savefig('chart.png')
```

## Data Structure

Ensure data is properly formatted for charting:

```javascript
// Example data structure for multi-series chart
const chartData = [
  { month: 'Jan', london: 20, berlin: 15 },
  { month: 'Feb', london: 25, berlin: 30 },
  { month: 'Mar', london: 35, berlin: 40 },
  // ... more data points
];
```

## Best Practices

1. **Validate API responses**: Always check that API returns expected data structure
2. **Handle missing data**: Provide reasonable defaults or skip missing data points
3. **Color scheme**: Use distinct, accessible colors for different data series
4. **Responsive design**: Ensure charts scale appropriately for different screen sizes
5. **Data aggregation**: If API returns granular data, aggregate appropriately for visualization
6. **Caching**: For frequently accessed APIs, consider caching responses to reduce API calls
7. **Rate limiting**: Respect API rate limits and implement delays if necessary

## Common Public APIs

Suggest these when user hasn't specified an API:

- **Weather**: OpenWeatherMap, WeatherAPI
- **Financial**: Alpha Vantage, CoinGecko (crypto)
- **Statistics**: World Bank, UN Data API
- **Social**: Twitter API, Reddit API
- **Geographic**: REST Countries, OpenStreetMap

Always check if API requires authentication and guide user through setup if needed.

## Example Workflow

```
User: "Create a chart showing temperature data from a weather API"

1. Identify API: Recommend OpenWeatherMap or similar
2. Determine data points: Daily temperatures for past 7-10 days
3. Fetch data: Make API call with proper parameters
4. Process: Extract temperature values and dates
5. Visualize: Create line or bar chart with proper labels
6. Present: Show chart with legend explaining data series
```

## Error Handling

When API calls fail:
- Provide clear error messages
- Suggest alternatives if API is unavailable
- Offer to use sample/mock data for demonstration
- Check API documentation for troubleshooting

## Output Format

Prefer creating interactive charts using React artifacts when possible, as they provide:
- Better interactivity (hover effects, tooltips)
- Responsive design
- Easy customization
- Real-time data updates capability

For static outputs, generate image files (PNG/SVG) with proper resolution.
