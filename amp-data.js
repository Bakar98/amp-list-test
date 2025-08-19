export default function handler(req, res) {
  const data = {
    items: [
      { title: "Product A", description: "Awesome gadget A" },
      { title: "Product B", description: "Useful tool B" },
      { title: "Product C", description: "Stylish item C" }
    ]
  };

  const sender = req.headers['amp-email-sender'];
  const origin = req.headers.origin;
  const sourceOrigin = req.query.__amp_source_origin;

  if (sender) {
    // AMP for Email CORS v2
    res.setHeader('AMP-Email-Allow-Sender', sender);
  } else if (origin && sourceOrigin) {
    // AMP for Email CORS v1
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Expose-Headers', 'AMP-Access-Control-Allow-Source-Origin');
    res.setHeader('AMP-Access-Control-Allow-Source-Origin', sourceOrigin);
  } else {
    return res.status(400).json({ error: 'Missing AMP CORS headers' });
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
}
